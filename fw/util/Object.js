const isUndefined = obj => obj === undefined;

module.exports.hasArrayAccess = key => /\[[0-9]+\]$/.test(key);

module.exports.isString = str => Object.prototype.toString.call(str) === '[object String]';

module.exports.isBoolean = bool => Object.prototype.toString.call(bool) === '[object Boolean]';

module.exports.isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';

module.exports.isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';

module.exports.isNumber = (num) => Object.prototype.toString.call(num) === '[object Number]';

module.exports.isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

module.exports.isNull = obj => obj === null || obj === undefined;

module.exports.eraseGetter = obj => obj && JSON.parse(JSON.stringify(obj));

module.exports.get = (obj, key, defaultVal) => {
    const isNull = module.exports.isNull;
    const hasArrayAccess = module.exports.hasArrayAccess;
    const eraseGetter = module.exports.eraseGetter;

    const realDefaultVal = isUndefined(defaultVal) ? null : defaultVal;

    if (isNull(obj)) {
        return realDefaultVal;
    }
    if (isNull(key)) {
        return realDefaultVal;
    }
    const keys = key.split('.');
    let val = obj;
    for (let k of keys) {
        if (hasArrayAccess(k)) {
            const index = k.match(/\[([0-9]+)\]/)[1] | 0;
            const tmpK = k.substring(0, k.indexOf('['));
            if (isNull(val[tmpK]) || isNull(val[tmpK][index])) {
                return realDefaultVal;
            }
            val = val[tmpK][index];
            continue;
        }

        if (isNull(val[k])) {
            return realDefaultVal;
        }
        val = val[k];
    }
    return eraseGetter(val);
};

module.exports.clone = function clone(obj) {
    const isNull = module.exports.isNull;
    if (isNull(obj) || Object.prototype.toString.call(obj) !== '[object Object]') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // Handle Array
    if (obj instanceof Array) {
        return obj.map(o => clone(o));
    }

    if (obj instanceof Object) {
        /* eslint-disable */
        return Object.keys(obj).reduce((p, c) => (p[c] = clone(obj[c]), p), {});
    }
};

module.exports.pick = function(obj, fields) {

    if (!obj) {
        return null;
    }

    const val = {};
    const keys = Object.keys(obj);

    /* eslint-disable */
    return keys
        .filter(key => fields.indexOf(key) > -1)
        .reduce((p, c) => (p[c] = obj[c], p), val);
};

module.exports.omit = function(obj, fields) {
    const val = {};

    if (!obj) {
        return val;
    }

    const keys = Object.keys(obj);

    /* eslint-disable */
    return keys
        .filter(key => fields.indexOf(key) < 0)
        .reduce((p, c) => (p[c] = obj[c], p), val);
};

module.exports.pickNotEmpty = function(obj) {
    const val = {};

    if (!obj) {
        return val;
    }

    const keys = Object.keys(obj);

    /* eslint-disable */
    return keys
        .filter(key => obj[key])
        .reduce((p, c) => (p[c] = obj[c], p), val);
};
