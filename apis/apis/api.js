const NotExistError = require('../../fw/error/NotExistError');
const InvalidParamsError = require('../../fw/error/InvalidParamsError');
const apiService = require('../../fw/db/service/APIService');
const Model = require('../../fw/db/service/APIModel');
const {omit} = require('../../fw/util/Object');

module.exports.api = '/internal-used/api/:id?';

module.exports.get = function*(req, res, next) {
    if (!req.params.id) {
        throw new InvalidParamsError('id must not be empty');
    }
    const api = yield apiService.getById(req.params.id);

    if (!api) {
        throw new NotExistError(`Specified id [${req.params.id}] doesn't exist`);
    }

    res
        .sendApi(api);
};

module.exports.delete = function*(req, res, next) {
    if (!req.params.id) {
        throw new InvalidParamsError('id must not be empty');
    }
    const id = yield apiService.deleteById(req.params.id);

    res
        .sendApi(id);
};

module.exports.post = function*(req, res, next) {
    const model = new Model(omit(req.body, ['_id']));

    const added = yield apiService.save(model);

    res
        .sendApi(added);
};

module.exports.put = function*(req, res, next) {
    if (!req.params.id) {
        throw new InvalidParamsError('id must not be empty');
    }
    const model = new Model(Object.assign({
        _id: req.params.id
    }, req.body));

    const updated = yield apiService.update(model);

    res
        .sendApi(updated);
};
