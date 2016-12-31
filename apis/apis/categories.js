const categoryService = require('../../fw/db/service/CategoryService');

module.exports.api = '/internal-used/categories';

module.exports.get = function*(req, res, next) {

    const categories = yield categoryService.get();

    res
        .sendApi(categories);
};
