const assert = require('assert');
const Application = require('../lib/application');
const is = require('is-type-of');

describe('test/application.js', () => {
  let app = null;
  describe('init check', () => {
    it('should thorw options.baseDir required', () => {
      assert.throws(() => {
        app = new Application({});
      }, /baseDir required/);
    });
    it('should thorw dir not exists', () => {
      assert.throws(() => {
        app = new Application({
          baseDir: 'not/exists/dir',
        });
      }, /not exists/);
    });
    it('should thorw not a directory', () => {
      assert.throws(() => {
        app = new Application({
          baseDir: `${__dirname}/fixtures/not_a_directory`,
        });
      }, /not a directory/);
    });
  });
  describe('service', () => {
    it('have a service', () => {
      app = new Application({
        baseDir: `${__dirname}/fixtures/service`,
      });
      assert(is.object(app.context.service.blog));
    });
  });
});
