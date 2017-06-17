module.exports = {
  // ref：https://github.com/eggjs/egg-core/blob/master/lib/utils/index.js
  loadFile(filepath) {
    try {
      // eslint-disable-next-line
      const obj = require(filepath);
      if (!obj) return obj;
      // it's es module
      // eslint-disable-next-line
      if (obj.__esModule) return 'default' in obj ? obj.default : obj;
      return obj;
    } catch (err) {
      err.message = `[core] load file: ${filepath}, error: ${err.message}`;
      throw err;
    }
  },
  existsModule(filepath) {
    try {
      require.resolve(filepath);
      return true;
    } catch (e) {
      return false;
    }
  },
  camelize(file) {
    return file.replace(/[_-][a-z]/ig, s => s.substring(1).toUpperCase());
  },
};
