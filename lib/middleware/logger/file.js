const Base = require('./base');

module.exports = class FileLogger extends Base {
  constructor(config) {
    super();
    this.setLogger({
      appenders: {
        // filename: 'all-the-logs.log', maxLogSize: 10485760, backups: 3, compress: true
        emergencies: { type: 'file', filename: config.errorFilename },
        errors: { type: 'logLevelFilter', appender: 'emergencies', level: 'error' },
        everything: Object.assign({ type: 'file' }, config),
      },
      categories: {
        default: { appenders: ['everything', 'errors'], level: 'debug' },
      },
    }, 'app');
  }
};