const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    // devServer: {
    //     contentBase: path.resolve(__dirname, './src'),
    //     historyApiFallback: true
    // },
    entry: {
        mainPage: path.resolve(__dirname, "./src/main.js"),
    },
    output: {
        filename: '[name].bundle.js',
        // filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".js", ".jsx", ".vue"],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,  // 必须写在前面
                use: ['vue-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sky 新标签页',
            filename: 'mainPage.html',
            template: 'public/index.html',
            chunks: ['mainPage']
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
                {
                    from: path.resolve(__dirname, 'src/extensionFiles'),
                    to: path.resolve(__dirname, 'dist/'),
                },
            ]
        }),
        new CleanWebpackPlugin()
    ]
}

