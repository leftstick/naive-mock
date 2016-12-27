const apis = require('../../fw/loader/apis');

module.exports.api = '/internal-used/apis';

module.exports.get = function*(req, res, next) {

    const {api, method, category, status} = req.query;

    const list = apis
        .getAPIs()
        .filter(a => {
            if (a.api.includes(api)) {
                return true;
            }
            if (a.category === category) {
                return true;
            }
            if (a.method === method) {
                return true;
            }
            if (a.status === status) {
                return true;
            }
            if (!api && !method && !category && !status) {
                return true;
            }
            return false;
        });

    res
        .sendApi(list);
};
