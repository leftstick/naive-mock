const request = require('request');

const {omit} = require('../../fw/util/Object');
const apis = require('../../fw/loader/apis');
const settings = require('../../fw/loader/settings');

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
    const models = apis.getAPIs().filter(a => a.api === url && a.method === method && a.enabled);

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
    return request({
        method: method,
        uri: `${opts.fallback}${url}`,
        headers: omit(req.headers, ['category'])
    })
        .on('error', function(err) {
            return res.sendError(404, {
                name: 'Fallback Error',
                message: 'fallback server is unavailable now'
            });
        })
        .pipe(res);
}

function getRealURL(url) {
    return url.replace(/^\/m/, '');
}
