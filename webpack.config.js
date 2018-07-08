'use strict';
const path = require('path');
let distFolder = path.resolve(__dirname, 'public/javascripts/dist');

module.exports = {
    entry: './public/javascripts/src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: distFolder,
        publicPath: distFolder + '/'
    },
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
