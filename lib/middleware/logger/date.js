const Base = require('./base');

module.exports = class DateFileLogger extends Base {
  constructor(config) {
    super();
    this.setLogger({
      appenders: {
        // filename: 'all-the-logs.log', pattern: '.yyyy-MM-dd-hh', compress: true
        everything: Object.assign({ type: 'dateFile' }, config),
      },
      categories: {
        default: { appenders: ['everything'], level: 'debug' },
      },
    });
  }
};
