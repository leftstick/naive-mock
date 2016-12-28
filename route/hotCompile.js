const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');
const {join} = require('path');

const envUtil = require('../fw/util/Env');

module.exports = function(app) {
    if (envUtil.isProduction) {
        return;
    }
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            chunkModules: false
        }
    });

    const assetPath = join(__dirname, '..', 'public', 'assets', 'index.html');

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get(/^(?!(\/internal-used\/|\/m\/)).+/, function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(assetPath));
        res.end();
    });
};
