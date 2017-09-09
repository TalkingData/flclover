module.exports = () => {
  return async function test(ctx, next) {
    await next();
  };
};
