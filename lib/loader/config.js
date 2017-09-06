const utils = require('../utils');

module.exports = {
  // Load the given middlewares with configs.
  loadConfig() {
    this.app.config = utils.existsModule(`${this.options.baseDir}/config`) ?
     utils.loadFile(`${this.options.baseDir}/config`) : {};
  },
};
