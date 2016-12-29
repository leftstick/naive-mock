const config = require('../../../config');
const chalk = require('chalk');

module.exports = function(app) {

    app.launch = function() {

        return new Promise(function(resolve, reject) {
            app.listen(config.server.port, '0.0.0.0', function(err) {
                if (err) {
                    return reject(err);
                }
                console.log(chalk.green(`naive-mock just started, open http://127.0.0.1:${config.server.port} and enjoy`));
                resolve();
            });
        });
    };
};
