// const path = require('path');
const fs = require('fs');
const utils = require('../utils');
const debug = require('debug')('loader:controller');

module.exports = {
  // Bind controller to context.
  loadController() {
    fs.readdirSync(`${this.options.baseDir}/app/controller`).forEach((file) => {
      debug('load controller %s', file);
      this.app.logger.info('load controller %s', file);
      this.app.controller[utils.camelize(file.slice(0, -3))] = this.loadFile(`${this.options.baseDir}/app/controller/${file}`);
    });
  },
};
