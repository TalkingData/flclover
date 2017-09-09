const Application = require('../../lib/application');
const assert = require('power-assert');

describe('test/lib/loader/middleware.js', () => {
  let app = null;
  beforeEach(() => {
    app = new Application({
      baseDir: `${process.cwd()}/test/fixtures/loader`,
    });
    app.start();
  });
  it('middleware list should includes test', () => {
    assert(app.config.middleware[0] === 'test');
  });
  afterEach(() => {
    app = null;
  });
});
