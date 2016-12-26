const settings = require('../../fw/loader/settings');

module.exports.api = '/internal-used/settings';

module.exports.get = function*(req, res, next) {

    res
        .sendApi(settings.get());
};
