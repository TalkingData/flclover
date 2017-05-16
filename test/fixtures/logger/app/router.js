module.exports = (router, controller) => {
  router.get('/', controller.home.index);
  router.get('/error', controller.home.error);
  router.get('/warn', controller.home.warn);
  router.get('/debug', controller.home.debug);
};
