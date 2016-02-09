var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ExtractSCSS = new ExtractTextPlugin('[name].css');

module.exports = {
  context: __dirname + "/snoin/web/static",
  entry: {
    'app': './src/main.js',
    'style': './src/style.scss'
  },
  output: {
    path: path.join(__dirname, "snoin", "web", "static", "dist"),
    publicPath: "/static/dist/",
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractSCSS.extract('style', 'css!sass')
      },
      {
        test: /\.(eot|woff2?|ttf|svg)(\?.+)?$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    ExtractSCSS,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devtool: 'source-map'
};
