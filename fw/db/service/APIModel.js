
class APIModel {
    constructor(raw) {
        if (raw._id) {
            this._id = raw._id;
        }
        this.api = raw.api;
        this.method = raw.method;
        this.enabled = raw.enabled;
        this.test_category = raw.test_category;
        this.status = raw.status + '' || '200';
        this.body = raw.body || '';
        this.headers = raw.headers || {};
        this.response = raw.response;
    }
}

module.exports = APIModel;

