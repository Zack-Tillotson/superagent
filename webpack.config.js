var path = require('path');
var webpack = require('webpack');

var buildEnv = process.env.BUILD || 'dev';

module.exports = {
  entry: {
    app: './src/entry.js',
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'app/assets'),
    publicPath: 'http://localhost:8080/assets' // Required for webpack-dev-server
  },
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
