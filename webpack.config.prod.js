const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const packageJson = require("./package.json");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: [
        './src/common/index.tsx'
    ],

    output: {
        filename: `bundle.${packageJson.version}.js`,
        path: path.resolve(__dirname, 'dist/static'),
        publicPath: ''
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: "tsconfig.prod.json"
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css/, use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader", options: {minimize: true}}]
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: "css-loader", options: {minimize: true}},
                        {loader: "sass-loader"},
                    ]
                }),
            },
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: 'file-loader?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, use: 'file-loader?name=[name].[ext]'}
        ]
    },

    plugins: [
        new ExtractTextPlugin(`bundle.${packageJson.version}.css`),
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: {
                    safari10: true,
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([
            {from: 'package.json', to: '../package.json'}
        ]),
    ]
};