const addLaunch = require('./launch');
const addResponseApi = require('./responseSendApi');

module.exports = function(app) {
    addLaunch(app);
    addResponseApi(app);
    return app;
};
