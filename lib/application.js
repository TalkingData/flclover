const KoaApplication = require('koa');
const fs = require('fs');
const utils = require('./utils');
const assert = require('assert');

class Application extends KoaApplication {
  constructor(options) {
    super();
    const baseDir = options.baseDir;
    assert(typeof options.baseDir === 'string', 'options.baseDir required, and must be a string');
    assert(fs.existsSync(options.baseDir), `Directory ${options.baseDir} not exists`);
    assert(fs.statSync(options.baseDir).isDirectory(), `Directory ${options.baseDir} is not a directory`);

    const service = {};
    const servicePath = `${baseDir}/app/service`;
    if (fs.existsSync(servicePath)) {
      fs.readdirSync(servicePath).forEach((file) => {
        service[file.slice(0, -3)] = utils.loadFile(`${baseDir}/app/service/${file}`);
      });
    }
    this.context.service = service;
  }
}
module.exports = Application;
