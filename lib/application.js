const KoaApplication = require('koa');
const fs = require('fs');
const utils = require('./utils');

class Application extends KoaApplication {
  constructor(options) {
    super();
    const baseDir = options.baseDir;

    const service = {};
    fs.readdirSync(`${baseDir}/app/service`).forEach((file) => {
      service[file.slice(0, -3)] = utils.loadFile(`${baseDir}/app/service/${file}`);
    });
    this.context.service = service;
  }
}
module.exports = Application;
