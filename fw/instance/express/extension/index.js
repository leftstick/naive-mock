const addLaunch = require('./launch');
const addRequest = require('./requestMock');
const addResponse = require('./responseSend');

module.exports = function(app) {
    addLaunch(app);
    addRequest(app);
    addResponse(app);
    return app;
};
