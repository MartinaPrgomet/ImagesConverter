var path = require('path');

module.exports = {
    context: path.join(__dirname, 'Scripts'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'Scripts'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ["es2015", "react"]
            }
        }]
    }
};