const config = require('../../../config');

module.exports = function(app) {

    app.launch = function() {

        return new Promise(function(resolve, reject) {
            app.listen(config.server.port, '0.0.0.0', function(err) {
                if (err) {
                    return reject(err);
                }
                console.log(`Express server listening on port ${config.server.port}`);
                resolve();
            });
        });
    };
};
