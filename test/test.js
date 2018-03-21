let index = require('../src/index');

let checkParam = new index.checkParam({data: 1, key: 2, value: 3});
console.log(checkParam.checkIsExists("test"));
console.log(checkParam.checkIsExists("data"));

let path = require('path');
let baseDir = path.resolve(__dirname, '..');

let log = new index.logHelper(baseDir, 4);
log.writeDebug("test");