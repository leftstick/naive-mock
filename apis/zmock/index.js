const uuidV1 = require('uuid/v1');
const request = require('request');
const minimatch = require('minimatch');

const {omit, serializeRequestBody} = require('../../fw/util/Object');
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

    const models = apis.getAPIs().filter(a => matchAPI(a, method, req));

    if (!models.length) { //no api defined, fallback
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

    if (req.body) {
        options.body = req.body;
    }
    return request(options)
        .on('error', function(err) {
            return res.sendError(404, {
                name: 'Fallback Error',
                message: 'fallback server is unavailable now'
            });
        })
        .on('response', function(response) {
            if (noSave(opts, req)) {
                return;
            }
            const body = [];
            response.on('data', function(chunk) {
                body.push(chunk);
            });
            response.on('end', function() {
                saveFallbackResult(url, method, req.category(), response.statusCode, options.body ? options.body.toString().trim() : null, Buffer.concat(body).toString().trim());
            });
        })
        .pipe(res);
}

function getRealURL(url) {
    return url.replace(/^\/m/, '');
}

function matchAPI(a, method, req) {
    const url = getRealURL(req.url);
    if (a.method !== method) {
        return false;
    }
    if (a.category !== req.category()) {
        return false;
    }
    if (serializeRequestBody(a.body) !== serializeRequestBody(req.body)) {
        return false;
    }
    if (!a.enabled) {
        return false;
    }
    if (matchURL(url, a.api)) {
        return false;
    }
    return true;
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

function noSave(opts, req) {
    if (!opts.saveFallbackResult || !req.category() || !opts.saveFallbackResult[req.category()] || req.category() === 'example') {
        return true;
    }
}

function saveFallbackResult(url, method, category, statusCode, requestBody, responseStr) {
    const model = new Model({
        id: uuidV1(),
        api: url,
        method: method,
        enabled: true,
        category: category,
        status: statusCode,
        body: requestBody,
        headers: {}, //TODO: header maybe supported later
        response: responseStr ? JSON.parse(responseStr) : {}
    });

    if (apis.getAPIs().some(d => d.id !== model.id && d.equals(model))) {
        return;
    }
    apis.saveAPI(model);
}
