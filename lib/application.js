const KoaApplication = require('koa');
const debug = require('debug')('flclover:application');
const fs = require('fs');
const utils = require('./utils');
const assert = require('assert');
const Router = require('koa-router');
const KoaLogger = require('koa-logger');
const FlcloverLogger = require('./middleware/logger');
const FlcloverProxy = require('flclover-proxy');
const BodyParser = require('./middleware/bodyparser');

 // Expose `Application` class.
 // Inherits from `KoaApplication.prototype`.
module.exports = class Application extends KoaApplication {

  // Initialize a new `Application`.
  constructor(options) {
    super();

    this.baseDir = options.baseDir;
    assert(typeof options.baseDir === 'string', 'options.baseDir required, and must be a string');
    assert(fs.existsSync(options.baseDir), `Directory ${options.baseDir} not exists`);
    assert(fs.statSync(options.baseDir).isDirectory(), `Directory ${options.baseDir} is not a directory`);

    this.config = {};
    this.controller = {};
    this.context.service = {};
  }

  // Start server
  start() {
    debug('start server');
    this.loadConfig();
    this.loadServices();
    this.loadMiddleware();
  }

  // Load all default middlewares
  loadMiddleware() {
    assert(utils.existsModule(`${this.baseDir}/app/router`), 'The module router is not exists');
    assert(fs.existsSync(`${this.baseDir}/app/controller`), `The directory ${this.baseDir}/app/controller is not exists`);
    assert(fs.statSync(`${this.baseDir}/app/controller`).isDirectory(), `The directory ${this.baseDir}/app/controller is not a directory`);

    const middlewares = this.config.middleware;
    if (middlewares) {
      middlewares.forEach((middleware) => {
        debug('use %s', middleware.name || '-');
        this.use(utils.loadFile(`${this.baseDir}/app/middleware/${middleware}`)(this.config[middleware], this));
      });
    }

    // https://github.com/koajs/bodyparser
    this.use(BodyParser(this.config.bodyParser || {
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

    if (this.env === 'development') {
      this.use(KoaLogger());
    }

    this.use(FlcloverLogger(this.config.flcloverLogger || {
      dir: this.baseDir,
      appFileName: 'app',
      errorFileName: 'error',
    }, this));
    this.use(FlcloverProxy(this.config.flcloverProxy, this));

    // Bind controller to routers.
    this.router = new Router();
    this.loadController();
    this.use(this.router.routes()).use(this.router.allowedMethods());
  }

  // Bind controller to context.
  loadController() {
    fs.readdirSync(`${this.baseDir}/app/controller`).forEach((file) => {
      debug('bind controller %s', file);
      this.controller[utils.camelize(file.slice(0, -3))] = utils.loadFile(`${this.baseDir}/app/controller/${file}`);
    });
    utils.loadFile(`${this.baseDir}/app/router`)(this.router, this.controller);
  }

  // Bind service to context.
  loadServices() {
    const service = {};
    const servicePath = `${this.baseDir}/app/service`;
    if (fs.existsSync(servicePath)) {
      fs.readdirSync(servicePath).forEach((file) => {
        debug('bind service %s', file);
        service[utils.camelize(file.slice(0, -3))] = utils.loadFile(`${this.baseDir}/app/service/${file}`);
      });
    }
    this.context.service = service;
  }

  // Load the given middlewares with configs.
  loadConfig() {
    this.config = utils.existsModule(`${this.baseDir}/config`) ?
     utils.loadFile(`${this.baseDir}/config`) : {};
  }
};
