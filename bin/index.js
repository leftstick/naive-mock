#!/usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({
    pkg: pkg
}).notify();

program
    .version(pkg.version)
    .option('-p, --port <port>', 'Specify port number, for example: 8080', parseInt)
    .option('-d, --dataDir <dataDir>', 'Specify where to put mock data, settings, for example: ./data')
    .option('-l, --logDir <logDir>', 'Specify where to put error log. Useful when you have error using naive-mock, you can send error log to me. No log recorded by default')
    .parse(process.argv);

process.env.NODE_ENV = 'production';

process.env.MOCK_PORT = program.port || 3000;
process.env.MOCK_DATA_DIR = program.dataDir || './data';
process.env.ERROR_LOG_DIR = program.logDir || 'NO_LOG';

require('../app');
