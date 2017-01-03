
module.exports = function(app) {
    app.request.category = function() {
        return this.get('test_category') || '';
    };
};
