const {resolve} = require('path');
const webpack = require('webpack');
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
    devtool: 'source-map',
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
                            js: 'babel-loader?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}!eslint-loader',
                            css: 'vue-style-loader!css-loader!postcss-loader'
                        }
                    }
                }]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {
                                    modules: false
                                }]
                            ],
                            plugins: ['transform-object-rest-spread']
                        }
                    },
                    'eslint-loader'
                ],
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
        ],
        alias: {
            vue$: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
