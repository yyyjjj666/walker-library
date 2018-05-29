let tool = require('../src/index');

let path = require('path');
let logConf = {
    app_id: "qy_message",
    path: path.dirname(__dirname, '.'),//日志根目录
    level: 4,//日志级别
    isRemote: true,//是否开启远程日志
    Redis: {
        port: 6379,          // Redis port
        host: '115.28.146.104',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: 'iope*169FLOZ#',
        db: 11
    }//远程Redis日志的配置信息
};

//日志
let log = new tool.logHelper(logConf.path, logConf.app_id, logConf.level, logConf.isRemote, logConf.Redis);

let mysql = new tool.mysqlHelper({
    username: 'root',
    password: '1234',
    database: 'acl_manager',
    host: "localhost",
    port: '3306',
    dialect: 'mysql'
}, log);

mysql.Add(`INSERT INTO acl_manager.test (\`name\`) VALUES (@name);`, {name: "测试"}, {name: false});
mysql.BatchAdd(`INSERT INTO acl_manager.test (\`name\`) VALUES `, "(@name)", [{name: "``'`"}, {name: "``'`"}, {name: "``'`"}]);

let RHelper = new tool.redisHelper({
    port: 6379,          // Redis port
    host: '115.28.146.104',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'iope*169FLOZ#',
    db: 11
});