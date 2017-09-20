const Base = require('./base');

module.exports = class DateFileLogger extends Base {
  constructor(config) {
    super();
    // console.log(config);
    this.setLogger({
      appenders: {
        everything: { type: 'dateFile', filename: 'all-the-logs.log', pattern: '.yyyy-MM-dd-hh', compress: true },
      },
      categories: {
        default: { appenders: ['everything'], level: 'debug' },
      },
    });
  }
};
