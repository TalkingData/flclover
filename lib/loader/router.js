const path = require('path');

module.exports = {
  // load router.js
  loadRouter() {
    this.loadFile(path.join(this.options.baseDir, 'app/router.js'), this.app.router, this.app.controller);
  },
};
