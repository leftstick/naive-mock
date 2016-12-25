const {readFile, writeFile} = require('fs');
const {settingsFile} = require('../config');

class SettingsLoader {
    constructor() {
        this.data = {};
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
            writeFile(settingsFile, JSON.stringify(this.data), (err) => {
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
