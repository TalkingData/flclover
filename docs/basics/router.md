# Router 路由

Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系， 框架约定了 app/router.js 文件用于统一所有路由规则。

通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起我们可以更方便的来查看全局的路由规则。

## 如何定义 Router
* `app/router/index.js` 里面定义 URL 路由规则

```
module.exports = (router, controller) => {
  router.get('/', controller.home.index);
};
```

* `app/controller` 目录下面实现 Controller

```
// app/controller/home.js
exports.index = async (ctx) => {
  ctx.body = 'koa';
};
```

这样就完成了一个最简单的 Router 定义，当用户执行 GET /home.js 这个里面的 index 方法就会执行。
