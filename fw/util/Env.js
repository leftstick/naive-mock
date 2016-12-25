
//for production
module.exports.isProduction = process.env.NODE_ENV === 'production';

//for dev
module.exports.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'false';
