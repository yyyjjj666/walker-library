const sequelize = require('sequelize');

class myHelper {
    constructor(conf, log) {
        if (log !== undefined && log !== null) {
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
        } else {
            this.Sequelize = new sequelize(conf.database, conf.username, conf.password, {
                host: conf.host,
                dialect: conf.dialect,
                port: conf.port,
                timezone: "+08:00",
                pool: {
                    max: 10,
                    min: 0,
                    idle: 10000,
                    benchmark: true//在打印执行的SQL日志时输出执行时间（毫秒）
                }
            });
        }
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

    Add(sql, ...param) {
        return new Promise((resolve, reject) => {
            sql = checkObject(sql, param[0], param[1]);
            this.Sequelize.query(sql).then((result) => {
                resolve(result[1] > 0);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    BatchAdd(sql, add_sql, ...param) {
        return new Promise((resolve, reject) => {
            try {
                if (Object.prototype.toString.call(param[0]) === "[object Array]") {
                    let excuteSql = "";
                    if (param[0].length > 0) {
                        for (let obj of param[0]) {
                            excuteSql += checkObject(add_sql, obj, param[1]) + ",";
                        }
                        excuteSql = sql + excuteSql.substring(0, excuteSql.length - 1) + ";";
                        this.Sequelize.query(excuteSql).then((result) => {
                            resolve(result[1]);
                        }).catch((err) => {
                            reject(err);
                        })
                    } else {
                        reject("参数为空!");
                    }

                } else {
                    reject("参数格式不正确!");
                }
            } catch (e) {
                reject(e.message);
            }
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

    Update(sql, ...param) {
        return new Promise((resolve, reject) => {
            sql = checkObject(sql, param[0], param[1]);
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

    Query(sql, ...param) {
        return new Promise((resolve, reject) => {
            sql = checkObject(sql, param[0], param[1]);
            this.Sequelize.query(sql).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    QueryProcedure(sql) {
        return new Promise((resolve, reject) => {
            this.Sequelize.query(sql).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        });
    }

}

let checkObject = (sql, object, special) => {
    let type = Object.prototype.toString.call(object);
    if (type === "[object Object]") {
        sql = filterLetter(sql, object, special);
    } else {
        throw  new Error("参数格式不正确!");
    }
    return sql;
};

let filterLetter = (sql, param, special) => {
    if (special) {
        for (let key in param) {
            let RegExp = special[`${key}`];
            let nparam = filterRegExp(param[key], RegExp);
            sql = sql.replace(`@${key}`, nparam);
        }
    } else {
        for (let key in param) {
            let nparam = filterRegExp(param[key]);
            sql = sql.replace(`@${key}`, nparam);
        }
    }
    return sql;
};

let filterRegExp = (param, RegExp) => {
    switch (Object.prototype.toString.call(param)) {
        case '[object Number]':
            param = param.toString();
            break;
        case '[object Object]':
            param = JSON.stringify(param);
            param = `'${param}'`;
            break;
        case '[object Array]':
            param = JSON.stringify(param);
            param = `'${param}'`;
            break;
        case '[object String]':
            switch (Object.prototype.toString.call(RegExp)) {
                case '[object RegExp]':
                    param = param.replace(RegExp, '');
                    break;
                case '[object Boolean]':
                    break;
                default:
                    param = param.replace(/[`'"\\/\b\f\n\r\t]/g, '');
                    break;
            }
            param = `'${param}'`;
            break;

        case '[object Undefined]':
            param = 'NULL';
            break;
        case  '[object Null]':
            param = 'NULL';
            break;
        case '[object Boolean]':
            param = param.toString();
            break;
    }
    return param;
};
module.exports = myHelper;