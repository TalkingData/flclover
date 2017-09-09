const KoaApplication = require('koa');
const debug = require('debug')('flclover:application');
const fs = require('fs');
const assert = require('assert');
const Router = require('koa-router');
const Loader = require('./loader');

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
      this.loader.load();
    } catch (e) {
      throw e;
    }
    this.use(this.router.routes()).use(this.router.allowedMethods());
  }
};
