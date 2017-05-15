# Middleware 中间件
Flclover 是基于 Koa 2.x 实现的，所以 Flclover 的中间件形式和 Koa 2 的中间件形式是一样的，都是基于 async function 的洋葱圈模型。每次我们编写一个中间件，就相当于在洋葱外面包了一层。

## 编写中间件
我们先来通过编写一个简单的 gzip 中间件，来看看中间件的写法。

```
const isJSON = require('koa-is-json');
const zlib = require('zlib');
async function gzip(next) {
  yield next;
  // 后续中间件执行完成后将响应体转换成 gzip
  let body = this.body;
  if (!body) return;
  if (isJSON(body)) body = JSON.stringify(body);
  // 设置 gzip body，修正响应头
  const stream = zlib.createGzip();
  stream.end(body);
  this.body = stream;
  this.set('Content-Encoding', 'gzip');
}
```
可以看到，框架的中间件和 Koa 的中间件写法是一模一样的，所以任何 Koa 的中间件都可以直接被框架使用。

## 配置
一般来说中间件也会有自己的配置。在框架中，一个完整的中间件是包含了配置处理的。我们约定一个中间件是一个放置在 app/middleware 目录下的单独文件，它需要 exports 一个普通的 function，接受一个参数：
options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。

我们将上面的 gzip 中间件做一个简单的优化，让它支持指定只有当 body 大于配置的 threshold 时才进行 gzip 压缩，我们要在 app/middleware 目录下新建一个文件 gzip.js

```
const isJSON = require('koa-is-json');
const zlib = require('zlib');
module.exports = options => {
  return async function gzip(ctx, next) {
    yield next();
    // 后续中间件执行完成后将响应体转换成 gzip
    let body = this.body;
    if (!body) return;
    // 支持 options.threshold
    if (options.threshold && this.length < options.threshold) return;
    if (isJSON(body)) body = JSON.stringify(body);
    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    this.body = stream;
    this.set('Content-Encoding', 'gzip');
  };
};

```

# 在应用中使用中间件
在应用中，我们可以完全通过配置来加载自定义的中间件，并决定它们的顺序。

如果我们需要加载上面的 gzip 中间件，在 config.default.js 中加入下面的配置就完成了中间件的开启和配置：

```
module.exports = {
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: [ 'gzip' ],
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
};
```
