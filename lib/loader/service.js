const fs = require('fs');
const debug = require('debug')('loader:service');
const utils = require('../utils');

module.exports = {
  // Bind service to context.
  loadService() {
    const service = {};
    const servicePath = `${this.options.baseDir}/app/service`;
    if (fs.existsSync(servicePath)) {
      fs.readdirSync(servicePath).forEach((file) => {
        debug('bind service %s', file);
        this.app.logger.info(`bind service ${file}`);
        service[utils.camelize(file.slice(0, -3))] = this.loadFile(`${this.options.baseDir}/app/service/${file}`);
      });
    }
    this.app.context.service = service;
  },
};
