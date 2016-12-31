const apiService = require('../../fw/db/service/APIService');
const {pickNotEmpty} = require('../../fw/util/Object');

module.exports.api = '/internal-used/apis';

module.exports.get = function*(req, res, next) {

    const params = pickNotEmpty(req.query);

    const result = yield apiService.search(params);

    res
        .sendApi(result);
};
