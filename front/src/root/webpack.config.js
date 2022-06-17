/* eslint-disable @typescript-eslint/no-require-imports */
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedConfig = require(__dirname + '/../webpack.shared.config');

const deps = require(__dirname + '/../../package.json').dependencies;
const config = sharedConfig({
  name: 'myeduzzroot',
  port: 3000,
  path: __dirname,
  skipMF: true,
  skipHot: false
});

module.exports = {
  ...config,
  plugins: [
    new ModuleFederationPlugin({
      name: 'myeduzzroot',
      filename: 'remoteEntry.js',
      remotes: {
        '@my-eduzz/sales': 'myeduzzsales@http://localhost:3001/remoteEntry.js',
        '@my-eduzz/products': 'myeduzzproducts@http://localhost:3002/remoteEntry.js'
      },
      exposes: {},
      shared: {
        ...deps,
        '@my-eduzz/shared': {
          singleton: true
        },
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
    ...config.plugins
  ]
};
