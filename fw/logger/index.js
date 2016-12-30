const fs = require('fs');
const winston = require('winston');
const mkdirp = require('mkdirp');
const moment = require('moment');
const chalk = require('chalk');

const config = require('../config');
const env = require('../util/Env');

const solveMsg = info => info.stack ? info.stack.toString() : info.toString();

class Logger {
    constructor() {
        this.logPath = config.logPath;

        if (this.logPath === 'NO_LOG') {
            return;
        }

        if (!fs.existsSync(this.logPath)) {
            mkdirp.sync(this.logPath);
        }

        this.errorLog = this._createLogger('error');
    }

    _createLogger(fileName) {
        return new winston.Logger({
            transports: [
                new winston.transports.File({
                    filename: `${this.logPath}/${fileName}.log`,
                    maxFiles: 1,
                    timestamp: function() {
                        return moment().format('YYYY-MM-DD HH:mm:ss');
                    }
                })
            ]
        });
    }

    error(message) {
        if (env.isDev || this.logPath === 'NO_LOG') {
            console.error(chalk.red(message));
        }
        this.errorLog.error(solveMsg(message));
    }

}

module.exports = new Logger();
