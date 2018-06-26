const webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    demo: './src/demo.js'
  },
  output: {
    path: path.resolve(__dirname, '../../docs'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      inject: 'body',
      minify: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      },
      hash: true,
      chunks: 'demo'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    open: 'Google Chrome',
    port: process.env.PORT || 8107
  }
};
