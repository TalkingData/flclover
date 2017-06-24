const assert = require('power-assert');
const Flclover = require('../..');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const sleep = require('ko-sleep');

describe('test/middleware/logger.js', () => {
  const baseDir = `${process.cwd()}/test/fixtures/logger`;
  const logPath = path.join(`${baseDir}/logs`, 'app.log');
  const errorLogPath = path.join(`${baseDir}/logs`, 'error.log');
  const app = Flclover({ baseDir });

  describe('ctx.logger.info', () => {
    request(app.listen())
      .get('/')
      .end(() => {});
    it('should exists file app.log', async () => {
      await sleep('1s');
      assert(fs.existsSync(logPath));
    });
    it('should includes home index in log file', async () => {
      await sleep('1s');
      const content = fs.readFileSync(logPath, 'utf8');
      assert(content.match(/home index\n/));
    });
  });
  describe('error', () => {
    request(app.listen())
      .get('/error')
      .end(() => {});
    it('should includes Error Stack', async () => {
      await sleep('1s');
      const content = fs.readFileSync(errorLogPath, 'utf8');
      assert(content.match(/controller\/home\.js/));
    });
    it('should includes Error boom', async () => {
      await sleep('1s');
      const content = fs.readFileSync(errorLogPath, 'utf8');
      assert(content.match(/Error: boom/));
    });
  });
  describe('warn', () => {
    request(app.listen())
      .get('/warn')
      .end(() => {});
    it('should includes warn msg', () => {
      const content = fs.readFileSync(logPath, 'utf8');
      assert(content.match(/warn msg\n/));
    });
  });
  describe('debug', () => {
    request(app.listen())
      .get('/debug')
      .end(() => {});
    it('should not includes debug msg', async () => {
      await sleep('1s');
      const content = fs.readFileSync(logPath, 'utf8');
      // level: 'INFO',
      assert(content.match(/debug msg\n/) === null);
    });
  });
});
