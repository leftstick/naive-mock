const fs = require('fs');
const co = require('co');
const path = require('path');

const InvalidParamsError = require('../fw/error/InvalidParamsError');
const logger = require('../fw/logger');
const {API_VERBS} = require('../fw/util/Constant');
const {isString, isNull} = require('../fw/util/Object');

const EXPECTED_ERRORS = ['DuplicatedError', 'InvalidParamsError', 'NotExistError'];

const skipUnderline = file => file.indexOf('_') !== 0 && file.indexOf('.') !== 0;

const skipIndex = file => file !== 'index.js';

const skipModel = file => file !== 'model';

const getAPIModules = file => {
    const files = fs.readdirSync(path.resolve(__dirname, file));
    return files
        .filter(skipUnderline)
        .filter(skipModel)
        .map(f => ({
            file: `${file}/${f}`,
            route: require(`./${file}/${f}`)
        }));
};

const flattenAPIModules = (p, c) => p.concat(c);

const skipApiWithoutApiField = mod => {
    if (mod.route.api) {
        return true;
    }
    logger.info(`[WARN - api] miss api field in [${mod.file}]`);
    return false;
};

const skipApiWithIncorrectCollectionField = mod => {
    if (isNull(mod.route.collection)) {
        return true;
    }
    if (!isNull(mod.route.collection) &&
        (isString(mod.route.collection)
        || Array.isArray(mod.route.collection))) {
        return true;
    }
    logger.info(`[WARN - api] miss collection field in [${mod.file}]`);
    return false;
};

const logErrors = err => {
    if (EXPECTED_ERRORS.indexOf(err.name) > -1) {
        return;
    }
    logger.error(err);
};

const wapperRouteHandler = (handler, mod) => {
    const {route} = mod;

    return function(req, res, next) {

        co(handler(req, res, next))
            .catch(function(err) {
                if (err instanceof InvalidParamsError) {
                    return res.sendError(400, err);
                }
                if (!err.message) {
                    err.message = '';
                }
                err.message = `[ERROR - api] [${route.api}] = ${err.message}`;
                logErrors(err);
                res.sendServerError(err);
            });
    };
};

const registerRoute = app => {
    return mod => {
        const router = app
            .route(mod.route.api);
        Object
            .keys(mod.route)
            .filter(verb => API_VERBS.indexOf(verb) > -1)
            .forEach(verb => {
                router[verb](wapperRouteHandler(mod.route[verb], mod));
            });
    };
};

module.exports = function(app) {
    const files = fs.readdirSync(__dirname);

    files
        .filter(skipUnderline)
        .filter(skipIndex)
        .map(getAPIModules)
        .reduce(flattenAPIModules)
        .filter(skipApiWithoutApiField)
        .filter(skipApiWithIncorrectCollectionField)
        .forEach(registerRoute(app));
};
