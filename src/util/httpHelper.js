const rp = require('request-promise');

class http {
    constructor() {

    }

    postParam(url, param) {
        let options = {
            method: 'POST',
            uri: url,
            body: param,
            json: true // Automatically stringifies the body to JSON
        };
        return rp(options);
    }

    httpGet(url) {
        let options = {
            uri: url,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        return rp(options)
    }
}

module.exports = http;