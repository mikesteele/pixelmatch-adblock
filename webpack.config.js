const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: './index.js',
  output: {
    filename: 'index.js',
    libraryTarget: 'window'
  },
  module: {
    rules: [
       {
         test: /\.(png|jpg|gif)$/i,
         use: [
           {
             loader: 'url-loader'
           },
         ],
       },
     ],
  },
};
