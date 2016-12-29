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
    .parse(process.argv);

require('../app');
