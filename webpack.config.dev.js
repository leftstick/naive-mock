const {resolve} = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssVars = require('postcss-simple-vars');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            'webpack-hot-middleware/client',
            resolve(__dirname, 'www', 'index.js')
        ]
    },
    output: {
        path: resolve(__dirname, 'public', 'assets'),
        filename: '[name].bundle.js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
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
            js: 'babel?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}!eslint',
            css: 'vue-style!css!postcss'
        }
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: ['last 5 versions']
            }),
            postcssNested(),
            postcssVars()
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
        ],
        alias: {
            vue$: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
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
