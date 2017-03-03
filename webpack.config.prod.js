const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: resolve(__dirname, 'www', 'index.js')
    },
    output: {
        path: resolve(__dirname, 'public', 'assets'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader!eslint-loader',
                            css: 'vue-style-loader!css-loader!postcss-loader'
                        }
                    }
                }]
            },
            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)\w*/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: [
            resolve(__dirname, 'node_modules'),
            resolve(__dirname),
            resolve(__dirname, 'www')
        ],
        extensions: [
            '.js',
            '.vue'
        ]
    },
    plugins: [
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
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'www/index.html',
            favicon: 'www/img/favicon.ico',
            hash: false,
            version: require('./package').version
        })
    ]
};
