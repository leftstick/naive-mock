const requestBody = require('./requestBody');
const proxy = require('./proxy');
const cookie = require('./cookie');
const serveStatic = require('./serveStatic');
const cors = require('./cors');

module.exports = function(app) {
    proxy(app);
    requestBody(app);
    cookie(app);
    serveStatic(app);
    cors(app);
};
