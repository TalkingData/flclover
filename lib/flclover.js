const assert = require('assert');
const is = require('is-type-of');
const Application = require('./application');
const fs = require('fs');
const utils = require('./utils');
const Router = require('koa-router');
const KoaLogger = require('koa-logger');
const FlcloverLogger = require('./middleware/logger');
const FlcloverProxy = require('flclover-proxy');
const BodyParser = require('./middleware/bodyparser');

module.exports = (options = {}) => {
  const baseDir = options.baseDir || process.cwd();
  const isShowConsole = is.undefined(options.devLog) ? true : options.devLog;
  const app = new Application({
    baseDir,
  });
  assert(utils.existsModule(`${baseDir}/app/router`), 'The module router is not exists');
  assert(fs.existsSync(`${baseDir}/app/controller`), `The directory ${baseDir}/app/controller is not exists`);
  assert(fs.statSync(`${baseDir}/app/controller`).isDirectory(), `The directory ${baseDir}/app/controller is not a directory`);

  // 根据配置项加载插件
  const config = utils.existsModule(`${baseDir}/config`) ?
   utils.loadFile(`${baseDir}/config`) : {};
  const middlewares = config.middleware;
  if (middlewares) {
    middlewares.forEach((middleware) => {
      app.use(utils.loadFile(`${baseDir}/app/middleware/${middleware}`)(config[middleware]));
    });
  }

  // https://github.com/koajs/bodyparser
  app.use(BodyParser(config.bodyParser || {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
  }));
  if (isShowConsole) {
    app.use(KoaLogger());
  }
  app.use(FlcloverLogger(config.flcloverLogger || {
    baseDir: options.baseDir,
  }));
  app.use(FlcloverProxy(config.flcloverProxy));

  // 加载页面路由
  const router = new Router();
  const controller = {};
  fs.readdirSync(`${baseDir}/app/controller`).forEach((file) => {
    controller[file.slice(0, -3)] = utils.loadFile(`${baseDir}/app/controller/${file}`);
  });
  utils.loadFile(`${baseDir}/app/router`)(router, controller);
  app.context.controller = controller;

  app
  .use(router.routes())
  .use(router.allowedMethods());

  // 打印错误信息
  app.on('error', (e) => {
    console.log('==== error report start ====');
    console.log(e);
    console.log('==== error report end ====');
  });

  return app;
};
