const nodeExternals = require('webpack-node-externals');
const path = require('path');

// const common = {

// };

const client = {
  context: __dirname + '/client/src',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  entry: __dirname + '/client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  }
};

const server = {
  context: __dirname + '/client/src',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: ['/client/src/index.jsx', /node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  target: 'node',
  entry: __dirname + '/client/src/server.jsx',
  externals: nodeExternals(),
  output: {
    filename: 'bundle-server.js',
    path: __dirname + '/client/dist',
    libraryTarget: 'commonjs2'
    // libraryTarget: 'commonjs'
    // libraryTarget: 'umd2'

    // libraryExport: 'default'
  }
};

module.exports = [Object.assign({}, server), Object.assign({}, client)];
