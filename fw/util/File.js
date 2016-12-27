const {readdirSync, statSync} = require('fs');
const {resolve} = require('path');

module.exports.dirExist = function(...filePaths) {
    try {
        const stat = statSync(resolve(...filePaths));
        return stat.isFile();
    } catch (error) {
        return false;
    }
};

module.exports.readFilePaths = function(dir) {
    try {
        return readdirSync(dir).map(file => resolve(dir, file));
    } catch (error) {
        return [];
    }
};
