const getHome = () => new Promise((resolve) => {
  setTimeout(() => resolve('home'), 50);
});

exports.index = async (ctx) => {
  ctx.body = await getHome();
};
