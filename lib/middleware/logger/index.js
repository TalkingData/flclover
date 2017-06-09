const Logger = require('egg-logger').EggLogger;

module.exports = function createLoggers(options = {
  appFileName: 'app',
  errorFileName: 'error',
}) {
  const dir = options.dir;

  const webLogger = new Logger({
    file: `${dir}/logs/${options.appFileName}.log`,
    level: 'INFO',
    consoleLevel: 'INFO',
    flushInterval: 1000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: true,
    // encoding: 'gbk',
  });

  const errorLogger = new Logger({
    file: `${dir}/logs/${options.errorFileName}.log`,
    level: 'ERROR',
    consoleLevel: 'ERROR',
    flushInterval: 1000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: true,
  });

  // errorLogger.error(new Error('mock error 中文'));


  return function featherLogger(ctx, next) {
    // istanbul ignore if
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
