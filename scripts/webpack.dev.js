/* eslint-env node */
const config = require('./webpack.config.js');
const webpack = require('webpack');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}

config.mode = 'development'

module.exports = (env) => {
  const PUBLIC_PATH = env.PUBLIC_PATH || '/';
  config.output.publicPath = PUBLIC_PATH;

  return config;
}


