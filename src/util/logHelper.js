'use strict';
const fs = require('fs');
const moment = require('moment');
const platform = require('os').platform();//'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
const color = require('colors-cli/safe');

class log {
    constructor(baseDir) {
        if (platform === "win32") {
            this.baseDir = baseDir + "\\logs\\";
        } else {
            this.baseDir = baseDir + "/logs/";
        }
        this.path = "";
        this.initDir()
    }

    initDir() {
        this.checkAndCreateDir(this.baseDir);
    }

    checkAndCreateDir(dir) {
        if (fs.existsSync(dir)) {

        } else {
            fs.mkdirSync(dir);
        }
    }

    writeLog(type, log) {
        let key = moment().format("YYYYMMDDHH");
        let colorParam = {};
        switch (type) {
            case "Info":
                this.path = this.baseDir + `Info`;
                colorParam = color.cyan.bold;
                break;
            case "Err":
                this.path = this.baseDir + `Err`;
                colorParam = color.red.bold;
                break;
            case "Warn":
                this.path = this.baseDir + `Warn`;
                colorParam = color.yellow.bold;
                break;
            default:
                this.path = this.baseDir + `Debug`;
                colorParam = color.green.bold;
                break;
        }
        this.checkAndCreateDir(this.path);
        if (platform === "win32") {
            this.path += `\\${key}.log`;
        } else
            this.path += `/${key}.log`;
        log = `[${moment().format("YYYY-MM-DD HH:mm:ss.ms")}] [${type}] [${log}]`;
        console.log(colorParam(log));
        // 写入文件内容（如果文件不存在会创建一个文件）
        // 传递了追加参数 { 'flag': 'a' }
        fs.writeFile(this.path, log + "\n", {'flag': 'a'}, function (err) {
            if (err) {
                throw err;
            }
        });
    }
}

class logHelper_public extends log {
    constructor(baseDir, log_level) {
        const level = [["Err"], ["Info", "Err"], ["Info", "Err", "Warn"], ["Info", "Err", "Warn", "Debug"]];
        super(baseDir);
        if (log_level)
            this.log_level = log_level;
        else
            throw new Error("log_level is not exists!");
        if (typeof(log_level) !== typeof(1)) {
            throw new Error("log_level is not number!");
        } else {
            this.level = level[log_level - 1];
        }
    }

    writeErr(log) {
        if (this.level.includes('Err')) {
            this.writeLog("Err", log);
        }
    }

    writeInfo(log) {
        if (this.level.includes('Info')) {
            this.writeLog("Info", log);
        }
    }

    writeWarn(log) {
        if (this.level.includes('Warn')) {
            this.writeLog("Warn", log);
        }
    }

    writeDebug(log) {
        if (this.level.includes('Debug')) {
            this.writeLog("Debug", log);
        }
    }
}

module.exports = logHelper_public;
