const getHome = () => new Promise((resolve) => {
  setTimeout(() => resolve('home'), 50);
});

exports.index = async (ctx) => {
  ctx.logger.info('hahaha');
  ctx.logger.error(new Error('error msg'));
  ctx.body = await getHome();
};
