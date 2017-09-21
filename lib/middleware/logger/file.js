const Base = require('./base');

module.exports = class FileLogger extends Base {
  constructor(config) {
    super();
    // console.log(config);
    this.setLogger({
      appenders: {
        // filename: 'all-the-logs.log', maxLogSize: 10485760, backups: 3, compress: true
        everything: Object.assign({ type: 'file' }, config),
      },
      categories: {
        default: { appenders: ['everything'], level: 'debug' },
      },
    });
  }
};
