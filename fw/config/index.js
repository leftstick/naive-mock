const {resolve} = require('path');

const WORKROOT = resolve(__dirname, '..', '..');

module.exports.dataDir = process.env.MOCK_DATA_DIR || resolve(WORKROOT, 'data');

module.exports.settingsFile = resolve(WORKROOT, 'settings.json');

module.exports.logPath = './log';

module.exports.server = {
    port: 3000
};
