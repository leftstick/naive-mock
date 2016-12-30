const {serializeRequestBody} = require('../util/Object');

class APIModel {
    constructor(raw) {
        this.id = raw.id;
        this.api = raw.api;
        this.method = raw.method;
        this.enabled = raw.enabled;
        this.category = raw.category;
        this.status = raw.status;
        this.body = raw.body;
        this.headers = raw.headers || {};
        this.response = raw.response;
    }

    toFilepath() {
        return this.id + '.json';
    }

    equals(model) {
        if (this.api !== model.api) {
            return false;
        }
        if (this.method !== model.method) {
            return false;
        }
        if (this.category !== model.category) {
            return false;
        }
        if (serializeRequestBody(this.body) !== serializeRequestBody(model.body)) {
            return false;
        }

        return true;
    }
}

module.exports = APIModel;

