const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const pkg = require('./package.json')
const conf = require('./src/config.json')

const isProd = process.env.NODE_ENV === 'production'
const favicon = conf.favicon
                ? path.resolve(__dirname, './src/conf.json', conf.favicon)
                : false

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: isProd
                  ? 'build.[chunkhash:5].js'
                  : 'build.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            loader: 'css-loader?{discardComments:{removeAll: true}}!scss-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[chunkhash:5]'
                    }
                }]
            }
        ],
        noParse: [
            /\.min\.js$/,
            /es6-promise\.js$/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'templ.html'),
            filename: 'index.html',
            favicon: favicon,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: isProd
                      ? 'build.[chunkhash:5].css'
                      : 'build.css',
            disable: false,
            allChunks: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        contentBase: 'dist/',
        host: '0.0.0.0'
    },
    devtool: isProd ? false : '#eval-source-map'
}

// Production configuration
if (isProd) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        
        // Minifying css
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Minifying JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // Extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            neme: 'vendor'
        }),

        // Service-worker precache
        new SWPrecachePlugin({
            cacheId: 'zypeh-blog',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    ])
}