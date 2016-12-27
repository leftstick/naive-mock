

class APIModel {
    constructor(raw) {
        this.id = raw.id;
        this.api = raw.api;
        this.method = raw.method;
        this.category = raw.category;
        this.status = raw.status;
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
        return true;
    }
}

module.exports = APIModel;
