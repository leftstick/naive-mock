const {readFile, writeFile, readdirSync, statSync, unlink} = require('fs');
const {resolve, basename} = require('path');
const mkdirp = require('mkdirp');

const {dataDir} = require('../config');
const DuplicatedError = require('../error/DuplicatedError');
const Model = require('./APIModel');

const DATA_FOLDERS = [resolve(__dirname, '..', '..', 'example-data'), dataDir];

class APIsLoader {
    constructor() {
        this.data = [];
        this.categories = [];
        this.statuses = [];
    }

    load() {
        return Promise.all(
            DATA_FOLDERS
                .map(readFilePaths)
                .reduce((p, c) => p.concat(c), [])
                .map(p => {
                    return new Promise((onSuccess, reject) => {
                        readFile(p, 'utf-8', (err, content) => {
                            if (err) {
                                return reject(err);
                            }
                            try {
                                const parsed = JSON.parse(content);
                                const model = new Model(parsed);
                                model.id = basename(p, '.json');
                                this.data.push(model);
                                this.setCategory(model.category);
                                this.setStatus(model.status);
                                onSuccess(model);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    });

                })
        );
    }

    saveAPI(model) {
        if (this.data.some(d => d.id !== model.id && d.equals(model))) {
            throw new DuplicatedError(`API [${model.api}] with specified metas has been defined`);
        }
        return new Promise((onSuccess, reject) => {

            if (!fileExist(dataDir)) {
                mkdirp.sync(dataDir);
            }

            writeFile(resolve(dataDir, model.toFilepath()), JSON.stringify(model, null, 4), err => {
                if (err) {
                    return reject(err);
                }
                if (this.data.some(d => d.id === model.id)) {
                    this.data = [model, ...this.data.filter(d => d.id !== model.id)];
                } else {
                    this.data.push(model);
                }
                this.setCategory(model.category);
                this.setStatus(model.status);
                onSuccess(model);
            });
        });
    }

    deleteAPI(model) {
        return new Promise((onSuccess, reject) => {
            unlink(resolve(dataDir, model.toFilepath()), err => {
                if (err) {
                    return reject(err);
                }
                this.data = this.data.filter(d => d.id !== model.id);
                onSuccess(model);
            });
        });
    }

    getAPIs() {
        return this.data;
    }

    getCategories() {
        return this.categories;
    }

    getStatuses() {
        return this.statuses;
    }

    setCategory(category) {
        if (this.categories.some(c => c === category)) {
            return;
        }
        this.categories.push(category);
    }

    setStatus(status) {
        if (this.statuses.some(s => s === status)) {
            return;
        }
        this.statuses.push(status);
    }
}

module.exports = new APIsLoader();


function readFilePaths(dir) {
    try {
        return readdirSync(dir).map(file => resolve(dir, file));
    } catch (error) {
        return [];
    }
}


function fileExist(...filePaths) {
    try {
        const stat = statSync(resolve(...filePaths));
        return stat.isFile();
    } catch (error) {
        return false;
    }
}
