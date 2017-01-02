const settingLoader = require('../../db/SettingLoader');

module.exports = function(app) {

    app.use(/\/m\/.*/, function(req, res, next) {

        const opts = settingLoader.get();
        if (!opts.cors || !req.headers.origin) {
            return next();
        }
        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, HEAD, TRACE, DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Range');
        res.set('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        next();
    });
};
