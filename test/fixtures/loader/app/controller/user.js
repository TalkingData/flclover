exports.index = async (ctx) => {
  ctx.body = await ctx.service.user.info();
};
