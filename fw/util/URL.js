
module.exports.resolve = (...paths) => {
    return paths.reduce((p, c) => {
        if (!p) {
            return (c || '').replace(/^\/+/, '/');
        }
        return p.replace(/\/+$/, '') + '/' + c.replace(/^\/+/, '');
    }, '');
};
