const Logger = require('./base');
const DateFileLogger = require('./date');
const ConsoleLogger = require('./console');
const FileLogger = require('./file');

function createLoggers(options = {
  // // 日志路径
  // dir: process.cwd(),
  // // 日志文件
  // appLogName: 'app',
  // // 错误文件
  // errorLogName: 'error',
  // // 日志切割规则，支持按日期或文件大小切割
  // file: {
  //   // 50 M
  //   maxLogSize: 50 * 1024,
  //   backups: 3,
  //   compress: true,
  // },
  // or
  // date: {
  //   // 按天 .yyyy-MM-dd
  //   // 按小时 .yyyy-MM-dd-hh
  //   pattern: '.yyyy-MM-dd',
  //   compress: true,
  // },
}) {
  let logger = null;
  if (options.file) {
    logger = new FileLogger({
      filename: `${options.dir}/${options.appLogName}.log`,
      errorFilename: `${options.dir}/${options.errorLogName}.log`,
      maxLogSize: options.file.maxLogSize,
      backups: options.file.backups,
      compress: true,
    });
  }
  if (options.date) {
    logger = new DateFileLogger({
      filename: `${options.dir}/${options.appLogName}.log`,
      errorFilename: `${options.dir}/${options.errorLogName}.log`,
      pattern: options.date.pattern,
      compress: true,
    });
  }

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
    ctx.logger = logger;
    // ctx.logger = {
    //   debug(...args) {
    //     logger.debug(...args);
    //   },
    //   info(...args) {
    //     logger.info(...args);
    //   },
    //   warn(...args) {
    //     logger.warn(...args);
    //   },
    //   error(...args) {
    //     logger.error(...args);
    //   },
    // };
    return next();
  };
}

createLoggers.Logger = Logger;
createLoggers.DateFileLogger = DateFileLogger;
createLoggers.ConsoleLogger = ConsoleLogger;
createLoggers.FileLogger = FileLogger;

module.exports = createLoggers;
