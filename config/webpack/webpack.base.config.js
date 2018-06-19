const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../../lib'),
    filename: '[name].js',
    publicPath: '/lib/',
    libraryTarget: 'umd',
    library: 'SlideRuler'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|lib|coverage)/,
        query: {
          presets: ['env']
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]'
          }
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
