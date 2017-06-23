const assert = require('power-assert');
const Application = require('../lib/application');
const is = require('is-type-of');
const request = require('supertest');

describe('test/application.js', () => {
  describe('koa', () => {
    it('should handle socket errors', (done) => {
      const app = new Application({
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
      app = new Application({
        baseDir: `${__dirname}/fixtures/demo`,
      });
      process.env.NODE_ENV = NODE_ENV;
      assert(app.env === 'development');
    });
  });

  describe('init check', () => {
    it('should thorw options.baseDir required', () => {
      assert.throws(() => {
        new Application({});
      }, /baseDir required/);
    });
    it('should thorw dir not exists', () => {
      assert.throws(() => {
        new Application({
          baseDir: 'not/exists/dir',
        });
      }, /not exists/);
    });
    it('should thorw not a directory', () => {
      assert.throws(() => {
        new Application({
          baseDir: `${__dirname}/fixtures/not_a_directory`,
        });
      }, /not a directory/);
    });
  });

  describe('init check', () => {
    it('should throw an error when the router is not found', () => {
      assert.throws(() => {
        (new Application({
          baseDir: `${__dirname}/fixtures/routercheck`,
        })).start();
      }, /router is not exists/);
    });
    it('should throw an error when the controller is not found', () => {
      assert.throws(() => {
        (new Application({
          baseDir: `${__dirname}/fixtures/controllercheck/app_no_controller`,
        })).start();
      }, /controller is not exists/);
    });
    it('should throw an error when the controller is not a directory', () => {
      assert.throws(() => {
        (new Application({
          baseDir: `${__dirname}/fixtures/controllercheck/app_controller_notdir`,
        })).start();
      }, /controller is not a directory/);
    });
  });

  describe('router', () => {
    const app = new Application({
      baseDir: `${__dirname}/fixtures/router`,
    });
    app.start();
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

  describe('service', () => {
    it('have a service', () => {
      const app = new Application({
        baseDir: `${__dirname}/fixtures/service`,
      });
      app.start();
      assert(is.object(app.context.service.blog) === true);
    });
  });

  describe('load controllers', () => {
    const app = new Application({
      baseDir: `${__dirname}/fixtures/controller`,
    });
    app.start();
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

  describe('load middlewares', () => {
    it('should throws Cannot find module', () => {
      assert.throws(() => {
        (new Application({
          baseDir: `${__dirname}/fixtures/no_middleware`,
        })).start();
      }, /Cannot find module/);
    });
    const app = new Application({
      baseDir: `${__dirname}/fixtures/middleware`,
    });
    app.start();
    it('should includes the middleware test', () => {
      assert(app.middleware[0].name === 'test');
    });
  });
});
