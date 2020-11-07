// webpack.config.js
var path = require('path');

module.exports = {
  entry: {
    doc_to_huff: './js/doc_to_huff.js',
    huff_nodes: './js/huff_nodes.js',
    huff_tree: './js/huff_tree.js',
    freq_table: './js/freq_table.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
