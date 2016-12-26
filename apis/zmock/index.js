const request = require('request');

const {omit} = require('../../fw/util/Object');
const apis = require('../../fw/loader/apis');
const settings = require('../../fw/loader/settings');

module.exports.api = '*';

module.exports.get = function*(req, res, next) {
    const url = req.url;
    const models = apis.getAPIs().filter(a => a.api === url);
    const opts = settings.get();

    if (!models.length) {
        return fallback(req, res, opts);
    }
    const category = req.category();

    if (category && models.every(m => m.category !== category)) {
        return fallback(req, res, opts);
    }

    const model = models[0];
    res.set(model.headers).sendMock(model.response);
};

function fallback(req, res, opts) {
    if (!opts.fallback) {
        return res.status(404).end();
    }
    return request
        .get({
            uri: `${opts.fallback}${req.url}`,
            headers: omit(req.headers, ['category'])
        })
        .pipe(res);
}
