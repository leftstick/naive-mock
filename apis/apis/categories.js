const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/categories';

module.exports.get = function*(req, res, next) {

    res
        .sendApi(apis.getCategories());
};
