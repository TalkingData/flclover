const utils = require('../../lib/utils');
const assert = require('assert');
const path = require('path');

describe('test/utils/index.js', () => {
  describe('loadFile', () => {
    const baseDir = path.join(__dirname, '../fixtures/loadfile');
    it('should load object', () => {
      const result = utils.loadFile(path.join(baseDir, 'object.js'));
      assert(result.a === 1);
    });

    it('should load null', () => {
      const result = utils.loadFile(path.join(baseDir, 'null.js'));
      assert(result === null);
    });

    it('should load zero', () => {
      const result = utils.loadFile(path.join(baseDir, 'zero.js'));
      assert(result === 0);
    });

    it('should load es module', () => {
      const result = utils.loadFile(path.join(baseDir, 'es-module.js'));
      assert(result.fn);
    });

    it('should load es module with default', () => {
      const result = utils.loadFile(path.join(baseDir, 'es-module-default.js'));
      assert(result.fn);
    });

    it('should load es module with default = null', () => {
      const result = utils.loadFile(path.join(baseDir, 'es-module-default-null.js'));
      assert(result === null);
    });
  });
});
