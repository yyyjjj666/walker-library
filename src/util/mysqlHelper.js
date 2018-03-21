const sequelize = require('sequelize');

class myHelper {
    constructor(conf, log) {
        this.Sequelize = new sequelize(conf.database, conf.username, conf.password, {
            host: conf.host,
            dialect: conf.dialect,
            port: conf.port,
            timezone: "+08:00",
            logging: (sql) => log.writeDebug(`DB ${sql}`),//用于Sequelize日志打印的函数
            pool: {
                max: 10,
                min: 0,
                idle: 10000,
                benchmark: true//在打印执行的SQL日志时输出执行时间（毫秒）
            }
        });
    }

    Add(sql) {
        return new Promise((resolve, reject) => {
            this.Sequelize.query(sql).then((result) => {
                resolve(result[1] > 0);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    Update(sql) {
        return new Promise((resolve, reject) => {
            this.Sequelize.query(sql).then((result) => {
                resolve(result[0]["affectedRows"] > 0);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    Query(sql) {
        return new Promise((resolve, reject) => {
            this.Sequelize.query(sql).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })
        });
    }
}

module.exports = myHelper;