const {readFile, writeFile} = require('fs');
const {dirname} = require('path');
const mkdirp = require('mkdirp');
const {settingsFile} = require('../config');

const {dirExist} = require('../util/File');

class SettingsLoader {
    constructor() {
        this.data = {
            fallback: '',
            saveFallbackResult: {}
        };
    }

    load() {
        return new Promise(resolve => {
            readFile(settingsFile, 'utf-8', (err, content) => {
                if (err) {
                    return resolve(this.data);
                }
                try {
                    this.data = JSON.parse(content);
                    resolve(this.data);
                } catch (error) {
                    resolve(this.data);
                }
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            const folder = dirname(settingsFile);
            if (!dirExist(folder)) {
                mkdirp.sync(folder);
            }
            writeFile(settingsFile, JSON.stringify(this.data, null, 4), err => {
                if (err) {
                    return reject(err);
                }
                resolve(this.data);
            });
        });
    }

    get() {
        return this.data;
    }

    set(key, value) {
        this.data[key] = value;
    }
}

module.exports = new SettingsLoader();
