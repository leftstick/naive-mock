var resolve = require('path').resolve;
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: resolve(__dirname, 'www', 'index.js')
    },
    output: {
        path: resolve(__dirname, 'public', 'assets'),
        filename: '[name].[hash].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style/useable!css'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel?{"presets":["es2015"]}!eslint',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)\w*/,
                loader: 'file'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel?{"presets":["es2015"]}!eslint',
            css: 'vue-style!css!postcss!less'
        }
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: ['last 5 versions']
            })
        ];
    },
    resolve: {
        root: [
            resolve(__dirname),
            resolve(__dirname, 'www')
        ],
        extensions: [
            '',
            '.js',
            '.vue'
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'www/index.html_vm',
            favicon: 'www/img/favicon.ico',
            hash: false
        })
    ]
};
