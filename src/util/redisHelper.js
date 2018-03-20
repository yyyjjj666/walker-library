const Redis = require('ioredis');

class redisHelper {
    // {
    //     port: 750,          // Redis port
    //     host: '39.106.27.231',   // Redis host
    //     family: 4,           // 4 (IPv4) or 6 (IPv6)
    //     password: '~*ddc*pro*~',
    //     db: 2
    // };
    constructor(conf) {
        this.redis = new Redis(conf);
    }

    redis_get(key) {
        return new Promise((resolve, reject) => {
            this.redis.smembers(key, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }

    redis_add(key, value) {
        this.redis.sadd(key, value);
    }

    redis_del(key, value) {
        return new Promise((resolve, reject) => {
            this.redis.srem(key, value, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }

    redis_get_key(db) {
        return new Promise((resolve, reject) => {
            this.redis.scan(db, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = redisHelper;