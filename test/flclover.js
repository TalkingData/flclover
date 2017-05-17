const request = require('supertest');
const assert = require('power-assert');
const Flclover = require('../');

describe('test/flclover.js', () => {
  describe('koa', () => {
    it('should handle socket errors', (done) => {
      const app = Flclover({
        baseDir: `${__dirname}/fixtures/demo`,
      });

      app.middleware.unshift((ctx) => {
        ctx.socket.emit('error', new Error('boom'));
      });

      app.on('error', (err) => {
        assert(err.message === 'boom');
        done();
      });

      request(app.listen())
        .get('/')
        .end(() => {});
    });
    it('should set development env when NODE_ENV missing', () => {
      const NODE_ENV = process.env.NODE_ENV;
      process.env.NODE_ENV = '';
      const app = Flclover({
        baseDir: `${__dirname}/fixtures/demo`,
      });
      process.env.NODE_ENV = NODE_ENV;
      assert(app.env === 'development');
    });
  });

  describe('init check', () => {
    it('should throw an error when the router is not found', () => {
      assert.throws(() => {
        Flclover({
          baseDir: `${__dirname}/fixtures/routercheck`,
        });
      }, /router is not exists/);
    });
    it('should throw an error when the controller is not found', () => {
      assert.throws(() => {
        Flclover({
          baseDir: `${__dirname}/fixtures/controllercheck/app_no_controller`,
        });
      }, /controller is not exists/);
    });
    it('should throw an error when the controller is not a directory', () => {
      assert.throws(() => {
        Flclover({
          baseDir: `${__dirname}/fixtures/controllercheck/app_controller_notdir`,
        });
      }, /controller is not a directory/);
    });
  });

  describe('router', () => {
    const app = Flclover({
      baseDir: `${__dirname}/fixtures/router`,
      devLog: false,
    });
    it('middlewares should includes the router middleware', () => {
      assert(app.middleware[app.middleware.length - 1].name === 'allowedMethods');
    });
    it('should response home', (done) => {
      request.agent(app.listen())
      .get('/')
      .expect(200)
      .expect(/home/, done);
    });
  });

  describe('controller', () => {
    const app = Flclover({
      baseDir: `${__dirname}/fixtures/controller`,
      devLog: false,
    });
    it('controllers should includes home and detail', () => {
      const controllers = Object.keys(app.context.controller);
      assert(controllers.length === 2);
      assert(controllers.includes('home'));
      assert(controllers.includes('detail'));
    });
    it('should response home with \'async\' api', (done) => {
      request.agent(app.listen())
      .get('/')
      .expect(200)
      .expect(/home/, done);
    });
  });

  describe('middleware', () => {
    it('should throws Cannot find module', () => {
      assert.throws(() => {
        Flclover({
          baseDir: `${__dirname}/fixtures/no_middleware`,
          devLog: false,
        });
      }, /Cannot find module/);
    });
    const app = Flclover({
      baseDir: `${__dirname}/fixtures/middleware`,
      devLog: false,
    });
    it('should includes the middleware test', () => {
      assert(app.middleware[0].name === 'test');
    });
  });
});
