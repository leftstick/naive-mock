const uuidV1 = require('uuid/v1');

const NotExistError = require('../../fw/error/NotExistError');
const InvalidParamsError = require('../../fw/error/InvalidParamsError');
const apis = require('../../fw/loader/apis');
const Model = require('../../fw/loader/APIModel');

module.exports.api = '/internal-used/api/:id?';

module.exports.get = function*(req, res, next) {
    if (!req.params.id) {
        throw new InvalidParamsError('id must not be empty');
    }
    const api = apis.getAPIs().find(a => a.id === req.params.id);

    if (!api) {
        throw new NotExistError(`Specified id [${req.params.id}] doesn't exist`);
    }

    res
        .sendApi(api);
};

module.exports.post = function*(req, res, next) {
    const model = new Model(Object.assign({
        id: uuidV1()
    }, req.body));

    const added = yield apis.saveAPI(model);

    res
        .sendApi(added);
};

module.exports.put = function*(req, res, next) {
    if (!req.params.id) {
        throw new InvalidParamsError('id must not be empty');
    }
    const found = apis.getAPIs().some(a => a.id === req.params.id);

    if (!found) {
        throw new NotExistError(`Specified id [${req.params.id}] doesn't exist`);
    }
    const model = new Model(req.body);

    const added = yield apis.saveAPI(model);

    res
        .sendApi(added);
};
