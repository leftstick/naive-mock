const InvalidParamsError = require('../../fw/error/InvalidParamsError');
const categoryService = require('../../fw/db/service/CategoryService');

module.exports.api = '/internal-used/category';

module.exports.post = function*(req, res, next) {

    if (!req.body.name) {
        throw new InvalidParamsError('category must not be empty');
    }

    const category = yield categoryService.add(req.body.name);

    res
        .sendApi(category);
};
