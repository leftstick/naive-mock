const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/category';

module.exports.post = function*(req, res, next) {

    const category = req.body.name;
    apis.setCategory(category);

    res
        .sendApi(category);
};
