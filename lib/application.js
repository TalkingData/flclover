const KoaApplication = require('koa');
const fs = require('fs');
const utils = require('./utils');
const assert = require('assert');


 // Expose `Application` class.
 // Inherits from `KoaApplication.prototype`.
class Application extends KoaApplication {

  // Initialize a new `Application`.
  constructor(options) {
    super();
    const baseDir = options.baseDir;
    assert(typeof options.baseDir === 'string', 'options.baseDir required, and must be a string');
    assert(fs.existsSync(options.baseDir), `Directory ${options.baseDir} not exists`);
    assert(fs.statSync(options.baseDir).isDirectory(), `Directory ${options.baseDir} is not a directory`);

    // Bind service to context.
    const service = {};
    const servicePath = `${baseDir}/app/service`;
    if (fs.existsSync(servicePath)) {
      fs.readdirSync(servicePath).forEach((file) => {
        service[file.slice(0, -3)] = utils.loadFile(`${baseDir}/app/service/${file}`);
      });
    }
    this.context.service = service;
    this.context.controller = {};
  }
}
module.exports = Application;
