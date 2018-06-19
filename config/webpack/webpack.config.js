const base = require('./webpack.base.config');
const merge = require('webpack-merge');

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.prod.config');
} else {
  config = require('./webpack.dev.config');
}

module.exports = merge(base, config);
