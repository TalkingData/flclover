const KoaApplication = require('koa');
const debug = require('debug')('flclover:application');
const fs = require('fs');
const assert = require('assert');
const Router = require('koa-router');
const Loader = require('./loader');
const Logger = require('egg-logger').EggLogger;

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
    this.logger = new Logger({
      file: `${this.baseDir}/core.error.log`,
      level: 'ERROR',
      consoleLevel: 'INFO',
      flushInterval: 5000,
      formatter: meta => `${meta.date} ${meta.message}`,
      buffer: true,
    });
    if (this.env === 'test') {
      this.logger.disable('console');
    }

    this.router = new Router();
    this.loader = new Loader({
      baseDir: this.baseDir,
      app: this,
    });
  }

  beforeStart() {
    this.logger.info('before server start');
  }

  // Start server
  start() {
    this.beforeStart();
    debug('server start');
    this.logger.info('server start');
    try {
      this.loader.load();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
    this.use(this.router.routes()).use(this.router.allowedMethods());
    this.ready();
  }

  ready() {
    this.logger.info('server ready');
  }
};
