const { join } = require('node:path')
const webpack = require('webpack')

require('dotenv').config({ path: './.env' })

module.exports = {
  entry: ['/client/index.tsx'],
  output: {
    path: join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
