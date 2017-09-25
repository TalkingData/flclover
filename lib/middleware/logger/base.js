const log4js = require('log4js');

const logger = Symbol('logger');

module.exports = class {
  constructor() {
    this[logger] = {};
  }

  debug(...args) {
    return this[logger].debug(...args);
  }

  info(...args) {
    return this[logger].info(...args);
  }

  warn(...args) {
    return this[logger].warn(...args);
  }

  error(...args) {
    return this[logger].error(...args);
  }

  // log4js configure
  configure(config) {
    return log4js.configure(config);
  }

  // log4js setLogger
  setLogger(config, category) {
    this.configure(config);
    this[logger] = log4js.getLogger(category);
  }

};
