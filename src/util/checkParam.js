'use strict';

class checkJson {
    constructor(json) {
        if (this.isObject(json)) {
            this.json = json;
        } else
            throw new Error("this is not object");
    }

    isObject(obj) {
        return '[object Object]' === Object.prototype.toString.call(obj);
    }

    checkNullOrEmpty(key) {
        if (this.json[key] === "" || this.json[key] === undefined || this.json[key] === undefined) {
            throw new Error(`"${key}"值不能为空！`);
        } else {
            return this.json[key];
        }
    }

    checkIsExists(key) {
        return !(this.json[key] === undefined || this.json[key] === undefined)
    }
}

module.exports = checkJson;