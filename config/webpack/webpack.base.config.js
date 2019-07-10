/*
 * @Desc: webpack基本配置
 * @Author: simbawu
 * @Date: 2019-04-16 20:15:13
 * @LastEditors: simbawu
 * @LastEditTime: 2019-07-10 15:46:38
 */
const path = require('path'),
  webpack = require('webpack');

module.exports = {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|lib|coverage)/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:3]'
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
