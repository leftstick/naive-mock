const URL_REGX = /^((https|http)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;

module.exports.resolve = (...paths) => {
    return paths.reduce((p, c) => {
        if (!p) {
            return (c || '').replace(/^\/+/, '/');
        }
        return p.replace(/\/+$/, '') + '/' + c.replace(/^\/+/, '');
    }, '');
};

module.exports.isURL = url => URL_REGX.test(url);
