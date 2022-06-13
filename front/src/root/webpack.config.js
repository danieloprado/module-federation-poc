/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedConfig = require(__dirname + '/../webpack.shared.config');

const deps = require(__dirname + '/../../package.json').dependencies;

module.exports = {
  ...sharedConfig('myeduzzroot', 3000, __dirname),

  plugins: [
    new ModuleFederationPlugin({
      name: 'myeduzzroot',
      filename: 'remoteEntry.js',
      remotes: {
        '@my-eduzz/sales': 'myeduzzsales@http://localhost:3001/remoteEntry.js'
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
};
