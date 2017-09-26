const Logger = require('egg-logger').EggLogger;

module.exports = function createLoggers(options = {
  appLogName: 'app',
  errorLogName: 'error',
}, app) {
  const dir = options.dir;

  const logger = new Logger({
    file: `${dir}/${options.appLogName}.log`,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    flushInterval: 5000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: true,
  });

  const errorLogger = new Logger({
    file: `${dir}/${options.errorLogName}.log`,
    level: 'ERROR',
    consoleLevel: 'ERROR',
    flushInterval: 5000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: true,
  });

  // errorLogger.error(new Error('mock error 中文'));
  if (app.env === 'test') {
    logger.disable('console');
    errorLogger.disable('console');
  }

  return function flcloverLogger(ctx, next) {
    // istanbul ignore if
    if (ctx.logger) return next();
    ctx.logger = {
      debug(msg) {
        logger.debug(msg);
      },
      info(msg) {
        logger.info(msg);
      },
      warn(msg) {
        logger.warn(msg);
      },
      error(msg) {
        errorLogger.error(msg);
      },
    };
    return next();
  };
};
