const settings = require('../../fw/loader/settings');

module.exports.api = '/internal-used/settings';

module.exports.get = function*(req, res, next) {

    res
        .sendApi(settings.get());
};

module.exports.put = function*(req, res, next) {

    const {fallback, saveFallbackResult} = req.body;

    settings.set('fallback', fallback.replace(/\/$/, ''));
    settings.set('saveFallbackResult', saveFallbackResult);

    const result = yield settings.save();

    res
        .sendApi(result);
};
