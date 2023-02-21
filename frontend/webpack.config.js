const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/
        },
        {
            test: /\.(c|sc|sa)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true
    }
};