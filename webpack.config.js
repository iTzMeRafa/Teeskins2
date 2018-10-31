var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        "app-home": "./frontend/Home.jsx",
        "app-skins": "./frontend/Skins.jsx",
        "global-styles": "./frontend/app-style.scss",
    },
    output: {
        path: __dirname + "/public/dist",
        filename: "[name].js",
        publicPath: '/dist'
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['/public/*.php'],
            proxy: 'http://teeskins.local/'
        })
    ],
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 2000,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                include: [
                    path.resolve(__dirname, 'frontend/js'),
                    path.resolve(__dirname, 'frontend/jsx'),
                    path.resolve(__dirname, 'frontend')
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                resolve: {
                    extensions: [".css", ".scss"]
                },
                include: [
                    path.resolve(__dirname, 'frontend/scss'),
                    path.resolve(__dirname, 'frontend')
                ],
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "resolve-url-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg)$/,
                include: [
                    path.resolve(__dirname, 'public/img')
                ],
                use: [{
                    loader: 'file-loader?name=/img/[name].[ext]\''
                }]
            }
        ]
    }
};