/* eslint-disable @typescript-eslint/no-require-imports */
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const sharedConfig = require(__dirname + '/../webpack.shared.config');
const deps = require(__dirname + '/../../package.json').dependencies;
const config = sharedConfig('myeduzzroot', 3000, __dirname, true);

module.exports = {
  ...config,

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: 'myeduzzroot',
      filename: 'remoteEntry.js',
      remotes: {
        '@my-eduzz/sales': 'myeduzzsales@http://localhost:3001/remoteEntry.js'
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
    })
  ]
};
