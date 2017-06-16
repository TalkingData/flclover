const assert = require('assert');
const is = require('is-type-of');
const Application = require('./application');
const fs = require('fs');
const utils = require('./utils');
const createLogger = require('./utils/logger');
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

  // Load the given middlewares with configs.
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
  if (app.env === 'development' && isShowConsole) {
    app.use(KoaLogger());
  }
  app.use(FlcloverLogger(config.flcloverLogger || {
    dir: options.baseDir,
    appFileName: 'app',
    errorFileName: 'error',
  }));
  app.use(FlcloverProxy(config.flcloverProxy));

  // Bind controller to routers.
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

  // Record error logs.
  app.on('error', (e) => {
    const errorLogger = createLogger(baseDir);
    errorLogger.error(new Error(e));
  });

  return app;
};
