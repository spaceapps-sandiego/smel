var path = require('path');

module.exports = {  
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            // js/jsx
            {
                test: /src\/.+\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'react-hmre', 'es2015']
                }
            },
            // styles
            {
                test: /src\/styles\/.+\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            },
            { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
        ]
    }
};