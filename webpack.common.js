module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /test\//,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts' ],
    },
}
