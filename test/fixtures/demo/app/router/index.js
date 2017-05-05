module.exports = (router, controller) => {
  router.get('/', controller.home.index);
};
