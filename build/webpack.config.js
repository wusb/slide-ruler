var path = require('path');

module.exports = {
  entry: {
    app: ['./src/main.js'],
    component: ['./components/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    publicPath: "/build/",
    libraryTarget: 'umd',
    library: 'Calendar'
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|build)/,
        query: {
          presets: ['env']
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]'
          },
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  devServer: {
    port: process.env.PORT || 8097
  }
};
