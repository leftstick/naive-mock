const InvalidParamsError = require('../../fw/error/InvalidParamsError');
const statusService = require('../../fw/db/service/StatusService');

module.exports.api = '/internal-used/status';

module.exports.post = function*(req, res, next) {

    if (!req.body.code) {
        throw new InvalidParamsError('status code must not be empty');
    }

    const status = yield statusService.add(req.body.code);

    res
        .sendApi(status);
};
