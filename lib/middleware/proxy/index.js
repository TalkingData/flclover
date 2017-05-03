const MemoryStore = require('../../module/memory-store');

const warning = 'Warning: Proxy\'s MemoryStore is not\n' +
  'designed for a production environment, as it will leak\n' +
  'memory, and will not scale past a single process.';

// proxy middleware
module.exports = function CoreProxy(options = { store: new MemoryStore() }) {
  const store = options.store;
  if (process.env.NODE_ENV === 'production' &&
   store instanceof MemoryStore) console.warn(warning);

  async function cache(config, key) {
    const cacheData = await store.get(key);
    // console.log(cacheData);
    return cacheData ||
     // 包装Promise，以缓存数据
     new Promise((resolve, reject) => {
       config[key].source.then((data) => {
         if (config[key].ttl) {
           store.set(key, data, config[key].ttl);
         }
         resolve(data);
       }).catch((e) => {
         console.log(e);
         reject(e);
       });
     });
  }

  return function featherProxy(ctx, next) {
    if (ctx.proxy) return next();

    // demo:
    // const dt = await ctx.proxy({
    //   data: { source: data() },
    //   data1: { source: data1(), cache: 5 },
    //   data2: { source: data2(), cache: 10 },
    //   data3: { source: data3(), cache: 15 },
    // });
    ctx.proxy = async (config) => {
      // 将key和source组合为一个Promise.all组合，保证对应关系。
      const keySourcePromises = [];
      Object.keys(config).forEach((key) => {
        // console.log(config[key].ttl || 'live');
        keySourcePromises.push(Promise.all([
          Promise.resolve(key),
          // TODO 缓存策略
          cache(config, key),
        ]));
      });
      const data = {};
      try {
        const list = await Promise.all(keySourcePromises);
        list.forEach((v) => {
          data[v[0]] = v[1];
        });
      } catch (e) {
        data.error = `proxy:${e.message}`;
      }
      return data;
    };
    return next();
  };
};
