const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'slide-ruler': './src/slide-ruler.js'
  },
  output: {
    path: path.resolve(__dirname, '../../lib'),
    publicPath: '/lib/',
    libraryTarget: 'umd',
    library: 'SlideRuler'
  }
};
