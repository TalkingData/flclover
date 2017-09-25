const getHome = () => new Promise((resolve) => {
  setTimeout(() => resolve('home'), 50);
});

exports.index = async (ctx) => {
  ctx.logger.info('hahahahahhahaha1111');
  ctx.logger.info('hahahahahhahaha32222');
  ctx.body = await getHome();
};
