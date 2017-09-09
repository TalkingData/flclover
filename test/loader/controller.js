const Application = require('../../lib/application');
const assert = require('power-assert');
const request = require('supertest');

describe('test/lib/loader/controller.js', () => {
  let app = null;
  beforeEach(() => {
    app = new Application({
      baseDir: `${process.cwd()}/test/fixtures/loader`,
    });
    app.start();
  });
  it('should response home', (done) => {
    request.agent(app.listen())
    .get('/')
    .expect(200)
    .expect(/home/, done);
  });
  afterEach(() => {
    app = null;
  });
});
