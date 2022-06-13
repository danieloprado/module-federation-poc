/* eslint-disable @typescript-eslint/no-require-imports */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require(__dirname + '/../package.json').dependencies;
const isDevelopment = process.env.NODE_ENV !== 'production';

const babelOptions = {
  presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-env'],
  plugins: ['@babel/transform-runtime']
};

module.exports = function (moduleName, port, path) {
  return {
    mode: isDevelopment ? 'development' : 'production',
    target: process.env.NODE_ENV !== 'production' ? 'web' : 'browserslist',

    devServer: {
      port,
      hot: true
    },

    output: {
      publicPath: 'http://localhost:' + port + '/'
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        '@': path + '/src/'
      }
    },

    devServer: {
      port: port,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Authorization'
      }
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
            loader: 'babel-loader',
            options: babelOptions
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            },
            {
              loader: 'react-svg-loader',
              options: { jsx: true }
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
          '.': path + '/src/remoteEntry'
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
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: path + '/src/index.html'
      })
    ].filter(Boolean)
  };
};
