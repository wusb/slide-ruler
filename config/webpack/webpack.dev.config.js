const webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    demo: './src/demo.js'
  },
  output: {
    path: path.resolve(__dirname, '../../docs'),
    publicPath: '/docs/'
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
      cache: true,
      showErrors: true,
      chunks: 'demo',
      chunksSortMode: 'auto',
      excludeChunks: '',
      xhtml: false
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: process.env.PORT || 8097
  }
};
