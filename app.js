const logger = require('./fw/logger');
const expressSetup = require('./fw/instance/express');
const apis = require('./apis');
const route = require('./route');

const co = require('co');

const app = require('./fw/instance')();

co(function*() {
    app.config(expressSetup);

    yield app.dataReady();

    app.config(route);
    app.config(apis);

    yield app.launch();

}).catch(function(err) {
    console.log(err);
    logger.error(err.message);
    setTimeout(function() {
        process.exit(-1);
    }, 2000);
});
