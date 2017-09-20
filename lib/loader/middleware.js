const fs = require('fs');
const debug = require('debug')('loader:middleware');
const utils = require('../utils');
const assert = require('assert');
// const KoaLogger = require('koa-logger');
const FlcloverLogger = require('../middleware/logger');
const FlcloverProxy = require('flclover-proxy');
const BodyParser = require('../middleware/bodyparser');

module.exports = {
  // Load all default middlewares
  loadMiddleware() {
    assert(utils.existsModule(`${this.options.baseDir}/app/router`), 'The module router is not exists');
    assert(fs.existsSync(`${this.options.baseDir}/app/controller`), `The directory ${this.options.baseDir}/app/controller is not exists`);
    assert(fs.statSync(`${this.options.baseDir}/app/controller`).isDirectory(), `The directory ${this.options.baseDir}/app/controller is not a directory`);

    const middlewares = this.app.config.middleware;
    if (middlewares) {
      middlewares.forEach((middleware) => {
        debug('use %s', middleware.name || '-');
        assert(utils.existsModule(`${this.options.baseDir}/app/middleware/${middleware}`), 'Cannot find middleware');
        this.app.use(this.loadFile(`${this.options.baseDir}/app/middleware/${middleware}.js`, this.app.config[middleware], this.app));
      });
    }

    // https://github.com/koajs/bodyparser
    this.app.use(BodyParser(this.app.config.bodyParser || {
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

    // if (this.app.env === 'development') {
    //   this.app.use(KoaLogger());
    // }

    this.app.use(FlcloverLogger(this.app.config.flcloverLogger || {
      dir: this.options.baseDir,
      appFileName: 'app',
      errorFileName: 'error',
    }, this.app));
    this.app.use(FlcloverProxy(this.app.config.flcloverProxy, this.app));
  },
};
