const {resolve} = require('path');

const WORKROOT = resolve(__dirname, '..', '..');

module.exports.dataDir = process.env.MOCK_DATA_DIR || resolve(WORKROOT, 'data');

module.exports.dbFile = resolve(module.exports.dataDir, 'database');

module.exports.settingsFile = resolve(module.exports.dataDir, 'settings.json');

module.exports.logPath = process.env.ERROR_LOG_DIR || resolve(WORKROOT, 'log');

module.exports.server = {
    port: process.env.MOCK_PORT || 3000
};
