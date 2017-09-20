const getHome = () => new Promise((resolve) => {
  setTimeout(() => resolve('home'), 50);
});

exports.index = async (ctx) => {
  ctx.logger.info('hahahahahhahaha1111');
  ctx.body = await getHome();
};
