class MemoryStore {

  constructor() {
    this.store = {};
  }

  async get(key) {
    return this.store[key];
  }

  async set(key, val) {
    // console.log([key, val, ttl]);
    this.store[key] = val;
  }

  async destroy(key) {
    delete this.store[key];
  }
}

module.exports = MemoryStore;
