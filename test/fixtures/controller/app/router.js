module.exports = (router, controller) => {
  router.get('/', controller.home.index);
  router.get('/detail', controller.detail.show);
};
