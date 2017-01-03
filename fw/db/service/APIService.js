const database = require('../Database');
const {isBoolean, isString, omit, isNull} = require('../../../fw/util/Object');
const NotExistError = require('../../../fw/error/NotExistError');
const DuplicatedError = require('../../../fw/error/DuplicatedError');

class APIService {
    constructor(db) {
        this.db = db;
    }

    search(query) {
        const dbQuery = {};
        if (query.api) {
            const api = query.api.replace(/\*/, '\\*');
            dbQuery.api = {
                $regex: new RegExp(api)
            };
        }
        if (!isNull(query.test_category)) {
            dbQuery.test_category = query.test_category;
        }
        if (query.method) {
            dbQuery.method = query.method;
        }
        if (query.status) {
            dbQuery.status = query.status;
        }
        if (isBoolean(query.enabled)) {
            dbQuery.enabled = query.enabled;
        } else if (isString(query.enabled)) {
            dbQuery.enabled = query.enabled === 'true';
        }
        if (query.body) {
            dbQuery.body = query.body;
        }
        return new Promise((resolve, reject) => {
            this.db
                .find(dbQuery, (err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(docs);
                });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this
                .db
                .findOne({
                    _id: id
                }, (err, doc) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(doc);
                });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this
                .db
                .remove({
                    _id: id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(id);
                });
        });
    }

    deleteByIds(ids) {
        return Promise.all(
            ids.map(id => this.deleteById(id))
        );
    }

    save(model) {
        return this
            .checkIfDefined(model)
            .then(defined => {
                if (defined) {
                    throw new DuplicatedError(`API [${model.api}] with specified metas has been defined`);
                }
                return new Promise((resolve, reject) => {
                    this
                        .db
                        .insert(model, function(err, newDoc) {
                            if (err) {
                                return reject(err);
                            }
                            resolve(newDoc);
                        });
                });
            });
    }

    count(query) {
        return new Promise((resolve, reject) => {
            this
                .db
                .count(query, function(err, count) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(count);
                });
        });
    }

    checkIfDefined(model) {
        const query = {
            api: model.api,
            test_category: model.test_category,
            body: model.body
        };
        if (model._id) {
            query._id = {
                $ne: model._id
            };
        }
        return this
            .count(query)
            .then(count => {
                return !!count;
            });
    }

    update(model) {
        return this
            .count({
                _id: model._id
            })
            .then(count => {
                if (!count) {
                    throw new NotExistError(`Specified id [${model._id}] doesn't exist`);
                }
                return;
            })
            .then(() => {
                return this
                    .checkIfDefined(model);
            })
            .then(defined => {
                if (defined) {
                    throw new DuplicatedError(`API [${model.api}] with specified metas has been defined`);
                }
                return new Promise((resolve, reject) => {
                    this
                        .db
                        .update({
                            _id: model._id
                        }, omit(model, ['_id']), {}, function(err, count) {
                            if (err) {
                                return reject(err);
                            }
                            resolve(model);
                        });
                });
            });
    }

}

module.exports = new APIService(database.get());
