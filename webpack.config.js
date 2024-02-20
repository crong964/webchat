var path = require("path")



module.exports = {
    entry: './source/client/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts'],
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist/client'),
    },
};
