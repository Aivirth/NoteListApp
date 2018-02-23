const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename : 'style.css'
});

module.exports = {
    entry : './src/js/app.js',
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename : 'bundle.js',
        publicPath: '/dist'
    },
    module :{
        rules : [
            {
                test: /\.js$/,
                use : [
                    {
                        loader : 'babel-loader',
                        options : {
                            presets: ["env"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use : extractPlugin.extract({
                    use : ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins : [
        extractPlugin
    ]
};