const database = require('../Database');

class CategoryService {
    constructor(db) {
        this.db = db;
        this.categories = [];
    }

    get() {
        if (this.categories.length) {
            return Promise.resolve(this.categories);
        }
        return new Promise((resolve, reject) => {
            this
                .db
                .find({})
                .projection({
                    test_category: 1
                })
                .exec(function(err, docs) {
                    if (err) {
                        return reject(err);
                    }
                    const categories = docs
                        .reduce((p, c) => p.includes(c.test_category) ? p : p.concat([c.test_category]), []);

                    resolve(categories);
                });
        });
    }

    add(category) {
        return new Promise(resolve => {
            this.categories.push(category);
            resolve(category);
        });
    }

}

module.exports = new CategoryService(database.get());
