const Application = require('../../lib/application');
const Loader = require('../../lib/loader');
const assert = require('power-assert');
const request = require('supertest');

describe('test/lib/loader/index.js', () => {
  let app = null;
  let loader = null;
  beforeEach(() => {
    app = new Application({
      baseDir: `${process.cwd()}/test/fixtures/loader`,
    });
    loader = new Loader({
      baseDir: `${process.cwd()}/test/fixtures/loader`,
      app,
    });
  });
  it('load shoule have load method', () => {
    assert(typeof loader.load, 'function');
  });
  afterEach(() => {
    app = null;
    loader = null;
  });
});
