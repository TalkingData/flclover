const Application = require('../../lib/application');
const assert = require('power-assert');
const request = require('supertest');

describe('test/lib/loader/service.js', () => {
  let app = null;
  beforeEach(() => {
    app = new Application({
      baseDir: `${process.cwd()}/test/fixtures/loader`,
    });
    app.start();
  });
  it('should response user info', (done) => {
    request.agent(app.listen())
    .get('/user/wxnet')
    .expect(200)
    .expect({
      user: 'wxnet',
    }, done);
  });
  afterEach(() => {
    app = null;
  });
});
