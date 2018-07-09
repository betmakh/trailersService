const { CACHE_TIME } = require('./constants');
// const NodeCache = require('node-cache');
var cache = require('node-file-cache').create({ life: CACHE_TIME });
// var cache = new NodeCache({ stdTTL: CACHE_TIME });

module.exports = {
    cache: cache,
    processRequestCache: (key, requestProcessFunction) => {
        if (typeof key === 'object') {
            key = JSON.stringify(key);
        }
        var cacheData = cache.get(key);
        if (cacheData) {
            return Promise.resolve(cacheData);
        } else {
            console.time(key);
            return requestProcessFunction().then(data => {
                console.timeEnd(key);
                cache.set(key, data);
                return data;
            });
        }
    }
};
