module.exports = (router, controller) => {
  router.get('/', controller.home.index);
  router.get('/user/wxnet', controller.user.index);
};
