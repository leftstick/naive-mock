
const gen = function*() {};

module.exports.isGenerator = func => func instanceof gen.constructor;
