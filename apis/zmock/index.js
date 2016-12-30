const uuidV1 = require('uuid/v1');
const request = require('request');
const minimatch = require('minimatch');

const {omit} = require('../../fw/util/Object');
const apis = require('../../fw/loader/apis');
const settings = require('../../fw/loader/settings');

const Model = require('../../fw/loader/APIModel');

module.exports.api = /^\/m\//;

module.exports.get = function*(req, res, next) {
    search(req, res, 'GET');
};

module.exports.post = function*(req, res, next) {
    search(req, res, 'POST');
};

module.exports.put = function*(req, res, next) {
    search(req, res, 'PUT');
};

module.exports.patch = function*(req, res, next) {
    search(req, res, 'PATCH');
};

module.exports.delete = function*(req, res, next) {
    search(req, res, 'DELETE');
};

function search(req, res, method) {
    const url = getRealURL(req.url);
    const models = apis.getAPIs().filter(a => a.method === method && a.enabled && matchURL(url, a.api));

    if (!models.length) { //no api defined, fallback
        return fallback(req, res, method);
    }
    const category = req.category();

    if (!category) { //no category specified, fallback
        return fallback(req, res, method);
    }

    if (category && models.every(m => m.category !== category)) { //no api defined for specific category, fallback
        return fallback(req, res, method);
    }
    const model = models[0];
    res.set(model.headers).sendMock(model.response);
}

function fallback(req, res, method) {
    const opts = settings.get();
    const url = getRealURL(req.url);

    if (!opts.fallback) {
        return res.status(404).end();
    }

    const options = {
        method: method,
        uri: `${opts.fallback}${url}`,
        headers: omit(req.headers, ['category'])
    };
    if ((method === 'PATCH' || method === 'POST' || method === 'PUT') && req.body) {
        options.body = JSON.stringify(req.body);
    }
    return request(options)
        .on('error', function(err) {
            return res.sendError(404, {
                name: 'Fallback Error',
                message: 'fallback server is unavailable now'
            });
        })
        .on('response', function(response) {
            if (response.statusCode !== 200 || !opts.saveFallbackResult || !req.category()) {
                return;
            }
            const body = [];
            response.on('data', function(chunk) {
                body.push(chunk);
            });
            response.on('end', function() {
                saveFallbackResult(url, method, req.category(), response.statusCode, Buffer.concat(body).toString());
            });
        })
        .pipe(res);
}

function getRealURL(url) {
    return url.replace(/^\/m/, '');
}

function matchURL(url, pattern) {
    return minimatch(url, pattern, {
        debug: false,
        nobrace: true,
        noglobstar: true,
        dot: false,
        noext: true,
        nocase: false,
        nonull: false,
        matchBase: false,
        nocomment: true,
        nonegate: false,
        flipNegate: false
    });
}

function saveFallbackResult(url, method, category, statusCode, responseStr) {
    const model = new Model({
        id: uuidV1(),
        api: url,
        method: method,
        enabled: true,
        category: category,
        status: statusCode,
        headers: {}, //TODO: header maybe supported later
        response: JSON.parse(responseStr)
    });
    apis.saveAPI(model);
}
