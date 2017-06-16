Flclover
=======
Four leaf clover🍀

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![node version][node-image]][node-url]
[![Test coverage][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/flclover.svg?style=flat-square
[npm-url]: https://npmjs.org/package/flclover
[download-image]: https://img.shields.io/npm/dm/flclover-init.svg?style=flat-square
[download-url]: https://npmjs.org/package/flclover
[node-image]: https://img.shields.io/badge/node.js-%3E=_7.6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[codecov-image]: https://img.shields.io/codecov/c/github/TalkingData/flclover.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/TalkingData/flclover

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

## target
* Coverage 100%
* Simple, stable and extensible enterprise Node Web framework.

## Installation
* macOS，Linux，Windows
* Koa requires node v7.6.0 or higher for ES2015 and async function support.

Quick start:

```bash
$ npm i flclover-init -g
$ flclover-init flclover-example --type=simple
$ cd flclover-example
$ npm i
```

Run:

```bash
$ npm run dev
$ open localhost:7001
```

## Running tests

```bash
$ npm test
```

## Community

 - [Examples](https://github.com/talkingdata/flclover-examples)

## License
  MIT
