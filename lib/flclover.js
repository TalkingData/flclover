const Application = require('./application');
// const createLogger = require('./utils/logger');

module.exports = (options = {}) => {
  const baseDir = options.baseDir || process.cwd();

  const app = new Application({
    baseDir,
  });

  // Record error logs.
  app.on('error', (e) => {
    // const errorLogger = createLogger(baseDir);
    app.logger.error(new Error(e));
  });

  app.start();

  return app;
};
