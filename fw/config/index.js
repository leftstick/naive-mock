const {resolve} = require('path');

const WORKROOT = resolve(__dirname, '..', '..');

module.exports.dataDir = process.env.MOCK_DATA_DIR || resolve(WORKROOT, 'data');

module.exports.settingsFile = resolve(WORKROOT, 'settings.json');

module.exports.logPath = resolve(WORKROOT, 'log');

module.exports.server = {
    port: process.env.MOCK_PORT || 3000
};
