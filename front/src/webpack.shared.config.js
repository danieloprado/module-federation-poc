/* eslint-disable @typescript-eslint/no-require-imports */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require(__dirname + '/../package.json').dependencies;
const isDevelopment = process.env.NODE_ENV !== 'production';

const babelOptions = {
  presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-env'],
  plugins: ['@babel/transform-runtime']
};

module.exports = function (config) {
  return {
    mode: isDevelopment ? 'development' : 'production',
    target: process.env.NODE_ENV !== 'production' ? 'web' : 'browserslist',
    output: {
      publicPath: 'http://localhost:' + config.port + '/'
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        '@': config.path + '/src/'
      }
    },

    devServer: {
      port: config.port,
      hot: true,
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
      !config.skipMF &&
        new ModuleFederationPlugin({
          name: config.name,
          filename: 'remoteEntry.js',
          remotes: {},
          exposes: {
            '.': config.path + '/src/remoteEntry'
          },
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
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: config.path + '/src/index.html'
      }),
      new Dotenv({
        safe: true,
        allowEmptyValues: true
      })
    ].filter(Boolean)
  };
};
