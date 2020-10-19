const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'assets/js/[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/index.html',
    }),  
    new webpack.ProvidePlugin({
      Phaser: 'phaser'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
};