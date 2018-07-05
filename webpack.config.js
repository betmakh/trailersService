'use strict';
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let distFolder = path.resolve(__dirname, 'public/javascripts/dist');

let prodPlugins = [
    new UglifyJsPlugin(),
    new CleanWebpackPlugin([distFolder]),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
];

module.exports = {
    entry: './public/javascripts/src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: distFolder,
        publicPath: distFolder + '/'
    },
    // plugins: [    new webpack.DefinePlugin({
    //     'global': {}
    // })],
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }
        ]
    }
};

// module.exports = env =>
//     env && env.prod == 'true'
//         ? [
//               Object.assign({}, configs.main, {
//                   plugins: prodPlugins
//               }),
//               Object.assign({}, configs.renderer, {
//                   plugins: prodPlugins
//               })
//           ]
//         : [
//               Object.assign({}, configs.main, {
//                   devtool: 'eval-source-map',
//                   watch: true
//               }),
//               Object.assign({}, configs.renderer, {
//                   devtool: 'eval-source-map',
//                   watch: true
//               })
//           ];