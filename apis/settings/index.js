const settings = require('../../fw/loader/settings');

module.exports.api = '/internal-used/settings';

module.exports.get = function*(req, res, next) {

    res
        .sendApi(settings.get());
};

module.exports.put = function*(req, res, next) {

    const {fallback} = req.body;

    settings.set('fallback', fallback.replace(/\/$/, ''));

    const result = yield settings.save();

    res
        .sendApi(result);
};
