const Base = require('./base');

module.exports = class ConsoleLogger extends Base {
  constructor(conf) {
    super();
    let config = conf;
    const lConfig = Object.assign({}, config);
    let { level, layout } = lConfig;
    level = level ? level.toUpperCase() : 'ALL';
    layout = layout || { type: 'pattern', pattern: '%[[%d] [%z] [%p]%] - %m' };

    config = Object.assign({
      appenders: {
        console: { type: 'console', level, layout },
      },
      categories: { default: { appenders: ['console'], level: 'info' } },
    }, lConfig);

    // this.setLogger({
    //   appenders: { console: { type: 'console' } },
    //   categories: { default: { appenders: ['console'], level: 'info' } },
    // });
    this.setLogger(config);
  }
};
