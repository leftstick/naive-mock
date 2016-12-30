const settings = require('../../fw/loader/settings');
const apis = require('../../fw/loader/apis');
const {isNull} = require('../../fw/util/Object');

module.exports.api = '/internal-used/settings';

module.exports.get = function*(req, res, next) {

    const opts = settings.get();

    if (!opts.saveFallbackResult) {
        opts.saveFallbackResult = {};
    }

    const categories = apis.getCategories();

    categories.forEach((c) => {
        if (isNull(opts.saveFallbackResult[c])) {
            opts.saveFallbackResult[c] = false;
        }
    });

    res
        .sendApi(opts);
};

module.exports.put = function*(req, res, next) {

    const {fallback, saveFallbackResult} = req.body;

    settings.set('fallback', fallback.replace(/\/$/, ''));
    settings.set('saveFallbackResult', saveFallbackResult);

    const result = yield settings.save();

    res
        .sendApi(result);
};
