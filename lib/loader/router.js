const path = require('path');

module.exports = {
  // load router.js
  loadRouter() {
    this.app.logger.info('load router');
    this.loadFile(path.join(this.options.baseDir, 'app/router.js'), this.app.router, this.app.controller);
  },
};
