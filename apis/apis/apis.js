const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/apis';

module.exports.get = function*(req, res, next) {

    res
        .sendApi(apis.getAPIs());
};
