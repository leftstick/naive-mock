const express = require('express');

const addConfig = require('./config');

const addExpressExtension = require('./express/extension');

const addDataLoader = require('../db');

module.exports = function() {
    var app = express();
    addConfig(app);
    addExpressExtension(app);
    addDataLoader(app);
    return app;
};
