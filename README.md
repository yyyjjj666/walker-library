```
npm install --save it-walker-tool
```
## 日志组件
日志组件初始化有2个参数"日志根目录地址"和"日志等级",有四个方法 writeInfo,writeErr,writeWarn,writeDebug
```
日志等级为1 输出Info
日志等级为2 输出Info、Err
日志等级为3 输出Info、Err、Warn
日志等级为4 输出Info、Err、Warn、Debug
```

- 初始化
```
let path = require('path');
const logHelper = require('it-walker-tool').logHelper;
let log = new logHelper(path.dirname(__dirname, '.'), 4); 

module.exports = {
    log: log
};
```
- 使用
```
log.writeErr(str);
```
