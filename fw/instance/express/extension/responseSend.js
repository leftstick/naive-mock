
module.exports = function(app) {
    app.response.sendApi = function(data) {
        this.json({
            data: data
        });
    };

    app.response.sendMock = function(data) {
        const self = this;
        try {
            self.json(JSON.parse(data));
        } catch (error) {
            self.send(data);
        }
        return {};
    };


    app.response.sendServerError = function(err) {
        this.sendError(500, {
            name: err.name,
            message: `${err.message}`
        });
    };

    app.response.sendError = function(code, err) {
        this.status(code).json({
            error: {
                name: err.name,
                message: err.message
            }
        });
    };
};
