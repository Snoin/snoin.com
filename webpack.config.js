var webpack = require("webpack");
var path = require('path');

module.exports = {
  context: __dirname + "/snoin/web/static",
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, "snoin", "web", "static", "dist"),
    publicPath: "/static/dist/",
    filename: 'app.js'
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
        loaders: ['style', 'css', 'sass']
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devtool: 'source-map'
};
