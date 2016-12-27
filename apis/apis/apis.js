const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/apis';

module.exports.get = function*(req, res, next) {

    const params = req.query;
    const paramsKeys = Object.keys(params);

    const list = apis
        .getAPIs()
        .filter(a => {
            //no filter
            if (paramsKeys.every(k => !params[k])) {
                return true;
            }
            const valueKeys = paramsKeys.filter(k => params[k]);
            if (valueKeys.every(k => a[k].includes(params[k]))) {
                return true;
            }
            return false;
        });

    res
        .sendApi(list);
};
