class RedisStore {

  constructor() {
    this.store = {};
  }

  async get(key) {
    return this.store[key];
  }

  async set(key, val, ttl) {
    console.log([key, val, ttl]);
    this.store[key] = val;
  }

  async destroy(key) {
    delete this.store[key];
  }
}

module.exports = RedisStore;
