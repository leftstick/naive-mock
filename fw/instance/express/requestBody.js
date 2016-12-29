const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json({
        strict: false
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
};
