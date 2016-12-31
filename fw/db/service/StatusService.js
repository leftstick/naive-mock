const database = require('../Database');

class StatusService {
    constructor(db) {
        this.db = db;
        this.statuses = [];
    }

    get() {
        if (this.statuses.length) {
            return Promise.resolve(this.statuses);
        }
        return new Promise((resolve, reject) => {
            this
                .db
                .find({})
                .projection({
                    status: 1
                })
                .exec(function(err, docs) {
                    if (err) {
                        return reject(err);
                    }
                    const statuses = docs
                        .reduce((p, c) => p.includes(c.status) ? p : p.concat([c.status]), []);

                    resolve(statuses);
                });
        });
    }

    add(status) {
        return new Promise(resolve => {
            this.statuses.push(status);
            resolve(status);
        });
    }

}

module.exports = new StatusService(database.get());
