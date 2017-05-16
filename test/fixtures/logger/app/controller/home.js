exports.index = async (ctx) => {
  ctx.logger.info('home index');
  ctx.body = 'home';
};

exports.error = async (ctx) => {
  ctx.logger.error(new Error('boom'));
  ctx.body = 'error';
};

exports.warn = async (ctx) => {
  ctx.logger.warn('warn msg');
  ctx.body = 'warn msg';
};

exports.debug = async (ctx) => {
  ctx.logger.debug('debug msg');
  ctx.body = 'debug msg';
};
