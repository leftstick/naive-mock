const apiService = require('../../fw/db/service/APIService');
const InvalidParamsError = require('../../fw/error/InvalidParamsError');
const {pickNotEmpty} = require('../../fw/util/Object');

module.exports.api = '/internal-used/apis';

module.exports.get = function*(req, res, next) {

    const params = pickNotEmpty(req.query);

    const result = yield apiService.search(params);

    res
        .sendApi(result);
};

module.exports.delete = function*(req, res, next) {
    const _ids = req.body;
    if (!_ids || !_ids.length) {
        throw new InvalidParamsError('id must not be empty');
    }
    const deleted = yield apiService.deleteByIds(_ids);
    res
        .sendApi(deleted);
};
