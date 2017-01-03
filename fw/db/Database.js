const Datastore = require('nedb');
const {dbFile} = require('../config');

class Database {
    constructor() {
        this.db = new Datastore({
            filename: dbFile
        });
    }

    load() {
        return new Promise((reslove, reject) => {
            this.db.loadDatabase(err => {
                if (err) {
                    return reject(err);
                }
                this.db.persistence.setAutocompactionInterval(1000 * 60 * 3);
                reslove(this.db);
            });
        });
    }

    get() {
        return this.db;
    }

}

module.exports = new Database();
