const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const content = require('./src/content.js');

module.exports = [
    {
        entry: {
            app: './src/secondary.js',
        },
        module: {
            rules: [
                {
                    test: /\.(s*)[ca]ss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'secondary.css'
            }),
        ]
    },
    {
        entry: {
            app: './src/primary.js',
        },
        output: {
            filename: './[name].bundle.js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(s*)[ca]ss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
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
                        scriptLoading: 'defer',
                        hash: true,
                        ...lang
                    })
                }
            ),
            new HtmlWebpackPlugin({
                template: './src/template.ejs',
                filename: './test.html',
                scriptLoading: 'defer',
                hash: true,
                ...content.test,
            }),
            new MiniCssExtractPlugin(),
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
            new CopyPlugin([
                {
                    from: './src/index.php',
                    to: 'index.php'
                },
            ]),
        ],
        devServer: {
            compress: true,
            port: 9000,
        },
    }
];
