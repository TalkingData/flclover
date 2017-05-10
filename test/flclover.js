const request = require('supertest');
const assert = require('assert');
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
        assert.equal(err.message, 'boom');
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
      assert.equal(app.env, 'development');
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
});
