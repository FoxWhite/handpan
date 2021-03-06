var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/entry.js",
    output: {
        path:'./public',
        filename: "bundle.js",
        publicPath: "/music/",
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
          "process.env": {
             NODE_ENV: JSON.stringify("production")
           }
        })
    ],
    devtool: 'source-map',
    resolve: {
        root: path.resolve()
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                  plugins: ['transform-decorators-legacy'],
                  presets: ['react', 'es2015', 'stage-1', 'stage-0']
                }
            },
            {
                test: /\.sass$/,
                // Passing indentedSyntax query param to node-sass
                loader: ExtractTextPlugin.extract(
                  'style',
                  'css!resolve-url-loader!sass?indentedSyntax&sourceMap',
                  ''
                ),
            },
            {
                test: /\.(less)$/,
                loader: ExtractTextPlugin.extract('style', '!css!less')
            },
            {
                test: /\.(png)$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.(ico)$/,
                loader: 'url-loader?limit=10000&mimetype=image/x-icon'
            },
            {
                test: /\.(svg)$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'},
            { test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
            { test: /\.(mp3)$/, loader: 'file-loader?name=sounds/[name].[ext]'}
        ]
    }
};