const apis = require('./apis');
const settings = require('./settings');

module.exports = function(app) {

    app.dataReady = function() {
        return Promise.all([
            apis.load(),
            settings.load()
        ]);
    };
};
