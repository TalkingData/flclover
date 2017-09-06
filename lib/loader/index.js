const fs = require('fs');
const utils = require('../utils');
const isFunction = require('is-type-of').function;
const assert = require('assert');

class Loader {

  constructor(options) {
    this.options = options;
    assert(fs.existsSync(this.options.baseDir), `${this.options.baseDir} not exists`);
    assert(this.options.app, 'options.app is required');
    // assert(this.options.logger, 'options.logger is required');

    this.app = this.options.app;
  }

  load() {
    this.loadConfig();
    this.loadService();
    this.loadMiddleware();
    this.loadController();
    this.loadRouter();
  }

  loadFile(filepath, ...inject) {
    if (!fs.existsSync(filepath)) {
      return null;
    }
    const ret = utils.loadFile(filepath);
    // function(arg1, args, ...) {}
    if (inject.length === 0) inject = [this.app];
    return isFunction(ret) ? ret(...inject) : ret;
  }
}

/**
 * Mixin methods to EggLoader
 * // ES6 Multiple Inheritance
 * https://medium.com/@leocavalcante/es6-multiple-inheritance-73a3c66d2b6b
 */
const loaders = [
  // require('./mixin/plugin'),
  require('./config'),
  // require('./mixin/extend'),
  // require('./mixin/custom'),
  require('./service'),
  require('./middleware'),
  require('./controller'),
  require('./router'),
];

for (const loader of loaders) {
  Object.assign(Loader.prototype, loader);
}

module.exports = Loader;
