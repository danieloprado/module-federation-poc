/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require(__dirname + '/../package.json').dependencies;

module.exports = function (moduleName, port, path) {
  return {
    output: {
      publicPath: 'http://localhost:' + port + '/'
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    devServer: {
      port: port,
      historyApiFallback: true
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true // true outputs JSX tags
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new ModuleFederationPlugin({
        name: moduleName,
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          '.': path + '/src/index'
        },
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
        template: path + '/src/index.html'
      })
    ]
  };
};
