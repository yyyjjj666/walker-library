const rp = require('request-promise');

function postParam(url, param) {
    let options = {
        method: 'POST',
        uri: url,
        body: param,
        json: true // Automatically stringifies the body to JSON
    };
    return rp(options);
}

function httpGet(param) {
    let options ;
    if(typeof(param)===typeof("")){
         options = {
            uri: param,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
    }else{
         options = {
            uri: param.url,
            headers:param.headers,
            json: true // Automatically parses the JSON string in the response
        };
    }
    return rp(options)
}

module.exports = {
    postParam,
    httpGet
};