const ExtendableError = require('./ExtendableError');

class UninitializedDbError extends ExtendableError {
    constructor(message) {
        super(message);
    }
}

module.exports = UninitializedDbError;
