const Logger = require('egg-logger').EggLogger;

module.exports = function createLoggers(options = {}) {
  const baseDir = options.baseDir;

  const webLogger = new Logger({
    file: `${baseDir}/logs/app.log`,
    level: 'INFO',
    consoleLevel: 'INFO',
    // flushInterval: 1000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: false,
    // encoding: 'gbk',
  });

  const errorLogger = new Logger({
    file: `${baseDir}/logs/error.log`,
    level: 'ERROR',
    consoleLevel: 'ERROR',
    // flushInterval: 1000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: false,
  });

  // errorLogger.error(new Error('mock error 中文'));


  return function featherLogger(ctx, next) {
    if (ctx.logger) return next();
    ctx.logger = {
      debug(msg) {
        webLogger.debug(msg);
      },
      info(msg) {
        webLogger.info(msg);
      },
      warn(msg) {
        webLogger.warn(msg);
      },
      error(msg) {
        errorLogger.error(new Error(msg));
      },
    };
    return next();
  };
};
