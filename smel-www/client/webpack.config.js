var path = require('path');

var NODE_PATH = process.env.NODE_PATH || path.resolve(__dirname, './node_modules');

module.exports = {  
    context: NODE_PATH,
    entry: path.resolve(__dirname, './src/main.js'),
    resolve: {
        root: [path.resolve(__dirname, './src'), NODE_PATH]
    },
    resolveLoader: {
        modulesDirectories: [
            NODE_PATH
        ]
    },
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
                test: /\.less$/,
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