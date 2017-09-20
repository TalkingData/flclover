const Logger = require('./base');
const DateFileLogger = require('./date');
const ConsoleLogger = require('./console');
const FileLogger = require('./file');

function createLoggers(options = {
  appFileName: 'app',
  errorFileName: 'error',
}, app) {
  // const dir = options.dir;
  // const webLogger = new FileLogger();
  // webLogger.trace('Entering cheese testing');
  // webLogger.debug('Got cheese.');
  // webLogger.info('Cheese is Gouda.');
  // webLogger.warn('Cheese is quite smelly.');
  // webLogger.error('Cheese is too ripe!');
  // webLogger.fatal('Cheese was breeding ground for listeria.');

  // const errorLogger = new Logger({
  //   file: `${dir}/logs/${options.errorFileName}.log`,
  //   level: 'ERROR',
  //   consoleLevel: 'ERROR',
  //   flushInterval: 1000,
  //   formatter: meta => `${meta.date} ${meta.message}`,
  //   buffer: true,
  // });

  // errorLogger.error(new Error('mock error 中文'));
  // if (app.env === 'test') {
  //   webLogger.disable('console');
  //   errorLogger.disable('console');
  // }

  return function flcloverLogger(ctx, next) {
    // istanbul ignore if
    if (ctx.logger) return next();
    ctx.logger = {
      debug(msg) {
        // webLogger.debug(msg);
      },
      info(msg) {
        // webLogger.info(msg);
      },
      warn(msg) {
        // webLogger.warn(msg);
      },
      error(msg) {
        // webLogger.error(msg);
      },
    };
    return next();
  };
}

createLoggers.Logger = Logger;
createLoggers.DateFileLogger = DateFileLogger;
createLoggers.ConsoleLogger = ConsoleLogger;
createLoggers.FileLogger = FileLogger;

module.exports = createLoggers;
