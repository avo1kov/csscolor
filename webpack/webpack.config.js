var HtmlWebpackPlugin = require('html-webpack-plugin');
const XMLWebpackPlugin = require('xml-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

const content = require('../src/content.js');

// console.log(Object.entries(content.langs).map(lang => lang));

module.exports = env => ({
    mode: env ? 'production' : 'development',
    // mode: `${env.MODE}`,
    // watch: true,
    entry: './src/index.js', //path relative to this file
    output: {
        filename: './app.bundle.js' //path relative to this file
    },
    module: {
        rules: [
            {
                test: /\.(s*)[ca]ss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'head'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        ...content.langs.map(lang => {
            console.warn(lang.langCode);
            return new HtmlWebpackPlugin({
                template: './src/template.ejs',
                filename: `./templates/${lang.langCode}.html`,
                hash: true,
                ...lang
            })
            }
        ),
        new HtmlWebpackPlugin({
            template: './src/template.ejs',
            filename: './test.html',
            hash: true,
            ...content.test,
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/template.ejs',
        //     filename: './template.html',
        //     hash: true,
        //     ...phpDataSet,
        // }),
        new MinifyPlugin(),
        new CopyPlugin([
            {
                from: './src/sitemap.xml',
                to: 'sitemap.xml',
                transform(content) {
                    return content
                        .toString()
                        .replace('<%= datetime %>', new Date().toISOString());
                }
            },
        ]),
    ]
});