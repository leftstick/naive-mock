const settings = require('./settings');

module.exports = function(app) {

    app.dataReady = function() {
        return Promise.all([
            settings.load()
        ]);
    };
};
