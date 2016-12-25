const logger = require('./fw/logger');
const expressSetup = require('./fw/instance/express');
const apis = require('./apis');
const route = require('./route');

const co = require('co');

const app = require('./fw/instance')();

co(function*() {
    app.config(expressSetup);

    yield app.dataReady();

    app.config(apis);
    app.config(route);

    yield app.launch();

}).catch(function(err) {
    logger.error(err.message);
    console.log(err);
    setTimeout(function() {
        process.exit(-1);
    }, 2000);
});
