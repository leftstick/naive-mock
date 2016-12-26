const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/status';

module.exports.post = function*(req, res, next) {

    const status = req.body.code;
    apis.setStatus(status);

    res
        .sendApi(status);
};
