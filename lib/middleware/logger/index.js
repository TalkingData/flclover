const Loggers = require('egg-logger').Logger;
const FileTransport = require('egg-logger').FileTransport;
const ConsoleTransport = require('egg-logger').ConsoleTransport;

module.exports = function createLoggers(options = {}) {
  const baseDir = options.baseDir;
  const logger = new Loggers();
  logger.set('file', new FileTransport({
    file: `${baseDir}/logs/app.log`,
    level: 'INFO',
  }));

  logger.set('console', new ConsoleTransport({
    level: 'DEBUG',
  }));

  return function featherLogger(ctx, next) {
    if (ctx.log) return next();
    ctx.log = {
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
        logger.error(new Error(msg));
      },
    };
    return next();
  };
};
