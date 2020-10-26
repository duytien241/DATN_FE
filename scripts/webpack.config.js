/* eslint-env node */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLwebpackplugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false } },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        oneOf: [
          {
            test: /\.ts(x?)$/,
            exclude: [/node_modules/, /test/],
            use: [
              {
                loader: 'ts-loader',
                options: {
                  configFile: 'tsconfig.json',
                },
              },
            ],
          },
          {
            test: /\.(js|jsx|mjs)$/,
            loader: 'babel-loader',
            exclude: [path.resolve(__dirname, 'node_modules')],
            options: { ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc'))) },
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './',
                },
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]',
                  },
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './',
                },
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins() {
                    return [require('autoprefixer')];
                  },
                },
              },
            ],
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: false,
              name: 'static/media/[name].[ext]',
            },
          },
          {
            test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
            loader: 'file-loader',
            options: {
              name: '/static/media/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new WebpackSynchronizableShellPlugin({
      onBuildStart: {
        scripts: ['npm run build:style-typings'],
        blocking: true,
        parallel: false,
      },
      dev: false, // makes sure command runs on file change
    }),
    new webpack.WatchIgnorePlugin([/scss\.d\.ts$/]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css',
    }),
    new HTMLwebpackplugin({
      template: './public/index.html',
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  devtool: 'source-map',
};
