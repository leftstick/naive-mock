const settingLoader = require('../../fw/db/SettingLoader');
const categoryService = require('../../fw/db/service/CategoryService');
const {isNull} = require('../../fw/util/Object');

module.exports.api = '/internal-used/settings';

module.exports.get = function*(req, res, next) {

    const opts = settingLoader.get();

    const categories = yield categoryService.get();

    categories.forEach((c) => {
        if (isNull(opts.saveFallbackResult[c]) && c !== 'example') {
            opts.saveFallbackResult[c] = false;
        }
    });

    res
        .sendApi(opts);
};

module.exports.put = function*(req, res, next) {

    const {fallback, saveFallbackResult} = req.body;

    settingLoader.set('fallback', fallback.replace(/\/$/, ''));
    settingLoader.set('saveFallbackResult', saveFallbackResult);

    const result = yield settingLoader.save();

    res
        .sendApi(result);
};
