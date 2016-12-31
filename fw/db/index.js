const database = require('./Database');
const settingLoader = require('./SettingLoader');

module.exports = function(app) {

    app.dataReady = function() {
        return Promise.all([
            database.load(),
            settingLoader.load()
        ]);
    };
};
