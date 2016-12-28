const express = require('express');
const {resolve} = require('path');

module.exports = function(app) {
    app.use(express.static(resolve(__dirname, '..', '..', '..', 'public'), {
        maxAge: 86400000
    }));
};
