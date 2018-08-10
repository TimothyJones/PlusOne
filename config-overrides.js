/* config-overrides.js */
const webpack = require('webpack');
const p = require('./package.json');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(
        new GitRevisionPlugin().version()
      ),
      'process.env.PROVIDER_URL': JSON.stringify(p.providerURL),
      'process.env.HOMEPAGE': JSON.stringify(p.homepage),
      'process.env.FEATURE.ScoreServer': false
    })
  );
  return config;
};
