const URL_REGX = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;

module.exports.resolve = (...paths) => {
    return paths.reduce((p, c) => {
        if (!p) {
            return (c || '').replace(/^\/+/, '/');
        }
        return p.replace(/\/+$/, '') + '/' + c.replace(/^\/+/, '');
    }, '');
};

module.exports.isURL = url => URL_REGX.test(url);
