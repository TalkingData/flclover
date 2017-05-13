Flclover
=======
Four leaf clover🍀

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![node version][node-image]][node-url]

[npm-image]: https://img.shields.io/npm/v/flclover.svg?style=flat-square
[npm-url]: https://npmjs.org/package/flclover
[download-image]: https://img.shields.io/npm/dm/flclover-init.svg?style=flat-square
[download-url]: https://npmjs.org/package/flclover
[node-image]: https://img.shields.io/badge/node.js-%3E=_7.6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

Build better enterprise frameworks and apps with Node.js &amp; Koa2

## Hello, Flclover!

* app/router.js

```javascript
module.exports = (router, controller) => {
  router.get('/', controller.home.index);
};
```

* app/controller/home.js

```javascript
exports.index = async (ctx) => {
  ctx.body = 'Hello, Flclover!';
};
```

## 目标
* 单元测试覆盖率100%
* 简单、稳定、易扩展的企业级Node Web框架

## 环境准备
* 操作系统：支持 macOS，Linux，Windows
* 运行环境：建议选择 Node Current 版本，最低要求 7.6

## 快速初始化

通过脚手架快速生成项目:

```
$ npm i flclover-init -g
$ flclover-init flclover-example --type=simple
$ cd flclover-example
$ npm i
```

启动项目:

```
$ npm run dev
$ open localhost:7001
```

## Running tests

```
$ npm test
```

## Community

 - [Examples](https://github.com/talkingdata/flclover-examples)

## License
  MIT
