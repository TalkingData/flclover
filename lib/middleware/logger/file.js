const Base = require('./base');

module.exports = class FileLogger extends Base {
  constructor(config) {
    super();
    // console.log(config);
    this.setLogger({
      appenders: {
        everything: { type: 'file', filename: 'all-the-logs.log', maxLogSize: 10485760, backups: 3, compress: true },
      },
      categories: {
        default: { appenders: ['everything'], level: 'debug' },
      },
    });
  }
};
