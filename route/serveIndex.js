const express = require('express');
const {resolve} = require('path');
const envUtil = require('../fw/util/Env');

module.exports = function(app) {

    if (envUtil.isDev) {
        return;
    }

    const assetsPath = resolve(__dirname, '..', 'public', 'assets');

    app.use(express.static(assetsPath));

    app.get(/^(?!\/api\/).+/, function response(req, res) {
        res.sendFile(resolve(assetsPath, 'index.html'));
    });
};