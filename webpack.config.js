var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
  },
  {
    test: /\.(eot|woff2?|ttf|svg)(\?.+)?$/,
    loader: 'file?name=[name].[ext]'
  },
  {
    test: /\.(jpe?g|png|gif)$/,
    loader: 'file?name=[name].[ext]'
  }
];
var preLoaders = [];
var plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),
  new webpack.DefinePlugin({
    'require.specified': 'require.resolve'
  }),
];
var devtool = 'cheap-module-source-map';

if (process.env.NODE_ENV === 'production') {
  loaders = [
    {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass')
    }
  ].concat(loaders);
  plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  ].concat(plugins);
} else {
  loaders = [
    {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss-loader?sourceMap!sass?sourceMap')
    }
  ].concat(loaders);
  if (process.env.USE_PRELOADER === 'true') {
    preLoaders.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });
  }
  devtool = 'source-map';
}

module.exports = {
  context: __dirname + "/snoin/web/static",
  entry: {
    app: './src/app.js',
    ie: './src/ie.js',
  },
  output: {
    path: path.join(__dirname, "snoin", "web", "static", "dist"),
    publicPath: "/static/dist/",
    filename: '[name].js'
  },
  module: {
    preLoaders: preLoaders,
    loaders: loaders
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: plugins,
  devtool: devtool
};
