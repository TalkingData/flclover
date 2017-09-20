const KoaApplication = require('koa');
const debug = require('debug')('flclover:application');
const fs = require('fs');
const assert = require('assert');
const Router = require('koa-router');
const Loader = require('./loader');
const Logger = require('./middleware/logger').Logger;

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
    this.logger = new Logger();
    this.logger.setLogger({
      appenders: {
        console: { type: 'console' },
        emergencies: { type: 'file', filename: `${this.baseDir}/core.error.log` },
        errors: { type: 'logLevelFilter', appender: 'emergencies', level: 'error' },
      },
      categories: {
        default: { appenders: ['errors', 'console'], level: 'info' },
      },
    }, 'core');
    // this.context.logger = this.logger;
    this.context.service = {};
    this.router = new Router();
    this.loader = new Loader({
      baseDir: this.baseDir,
      app: this,
    });
  }

  // Start server
  start() {
    debug('start server');
    try {
      this.logger.info('start server');
      this.loader.load();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
    this.use(this.router.routes()).use(this.router.allowedMethods());
  }
};
