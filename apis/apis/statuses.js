const statusService = require('../../fw/db/service/StatusService');

module.exports.api = '/internal-used/statuses';

module.exports.get = function*(req, res, next) {
    const statuses = yield statusService.get();

    res
        .sendApi(statuses);
};
