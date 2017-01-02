const bodyParser = require('body-parser');

module.exports = function(app) {

    const jsonParser = bodyParser.json({
        strict: false
    });

    app.use(/^\/internal-used\/.*/, jsonParser);

    app.use(/\/m\/.*/, function(req, res, next) {
        req.body = '';
        const body = [];
        req.on('data', function(chunk) {
            body.push(chunk);
        });
        req.on('end', function() {
            if (body.length) {
                req.body = Buffer.concat(body).toString();
            }
            next();
        });

    });
};
