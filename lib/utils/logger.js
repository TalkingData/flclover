const Loggers = require('egg-logger').EggLogger;

module.exports = function createLogger(dir) {
  const loggers = new Loggers({
    file: `${dir}/flclover.error.log`,
    level: 'ERROR',
    consoleLevel: 'ERROR',
    flushInterval: 5000,
    formatter: meta => `${meta.date} ${meta.message}`,
    buffer: true,
  });

  return loggers;
};
