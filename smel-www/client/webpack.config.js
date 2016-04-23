var path = require('path');

module.exports = {  
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    eslint: {
        configFile: './.eslintrc.json'
    },
    module: {
        loaders: [
            // js/jsx
            {
                test: /src\/.+\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=react-hmre,presets[]=es2015', 'eslint-loader']
            },
            // styles
            {
                test: /src\/styles\/.+\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            },
            // font files
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    }
};