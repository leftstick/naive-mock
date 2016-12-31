const request = require('request');
const minimatch = require('minimatch');

const {omit} = require('../../fw/util/Object');
const apiService = require('../../fw/db/service/APIService');
const settingLoader = require('../../fw/db/SettingLoader');

const Model = require('../../fw/db/service/APIModel');

module.exports.api = /^\/m\//;

module.exports.get = function*(req, res, next) {
    yield search(req, res, 'GET');
};

module.exports.post = function*(req, res, next) {
    yield search(req, res, 'POST');
};

module.exports.put = function*(req, res, next) {
    yield search(req, res, 'PUT');
};

module.exports.patch = function*(req, res, next) {
    yield search(req, res, 'PATCH');
};

module.exports.delete = function*(req, res, next) {
    yield search(req, res, 'DELETE');
};

function search(req, res, method) {
    const url = getRealURL(req.url);

    return apiService
        .search({
            method: method,
            test_category: req.category(),
            enabled: true,
            body: req.body
        })
        .then(items => {
            if (!items.length) {
                return fallback(req, res, method);
            }
            const filterWithAPIs = items.filter(it => matchURL(url, it.api));
            if (!filterWithAPIs.length) {
                return fallback(req, res, method);
            }
            const item = filterWithAPIs[0];
            return res
                .set(item.headers)
                .status(item.status)
                .sendMock(item.response);
        });
}

function fallback(req, res, method) {
    const opts = settingLoader.get();
    const url = getRealURL(req.url);

    if (!opts.fallback) {
        return res.status(404).end();
    }

    const options = {
        method: method,
        uri: `${opts.fallback}${url}`,
        headers: omit(req.headers, ['test_category'])
    };

    if (req.body) {
        options.body = req.body;
    }

    return new Promise((resolve, reject) => {
        request(options)
            .on('error', function(err) {
                return res.sendError(404, {
                    name: 'Fallback Error',
                    message: 'fallback server is unavailable now'
                });
            })
            .on('response', function(response) {
                if (noSave(req)) {
                    return;
                }
                const body = [];
                response.on('data', function(chunk) {
                    body.push(chunk);
                });
                response.on('end', function() {
                    const responseBody = Buffer.concat(body).toString().trim();
                    saveFallbackResult(
                        url,
                        method,
                        req.category(),
                        response.statusCode,
                        options.body,
                        responseBody)
                        .then(resolve);
                });
            })
            .pipe(res);
    });
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

function noSave(req) {
    const opts = settingLoader.get();
    if (!opts.saveFallbackResult || !req.category() || !opts.saveFallbackResult[req.category()]) {
        return true;
    }
}

function saveFallbackResult(url, method, category, statusCode, requestBody, responseStr) {
    const model = new Model({
        api: url,
        method: method,
        enabled: true,
        test_category: category,
        status: statusCode,
        body: requestBody,
        headers: {}, //TODO: header maybe supported later
        response: responseStr || ''
    });

    return apiService
        .save(model)
        .then(emptyCallback, emptyCallback);
}

function emptyCallback() {
}
