const fs = require('fs-extra');
const path = require('path');
const Tip = require('./Tip');

module.exports = function(tip = new Tip()) {
  const isHaveDll = fs.existsSync(path.resolve(tip.paths.dll, 'dll.js'));
  return {
    target: 'web',
    mode: tip.isDev ? tip.mode.development : tip.mode.production,
    devtool: tip.isDev ? tip.devtool.sourceMap : tip.devtool.none,
    stats: 'errors-only',
    entry: {
      main: tip.paths.entry,
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: tip.paths.output,
    },
    resolve: {
      extensions:tip.resolve.extensions,
      alias:tip.resolve.alias,
      plugins: [],
    },
    externals: {},
    module: {
      rules: [
        tip.module.rules.cssLoader,
        tip.module.rules.stylusLoader,
        tip.module.rules.urlLoader,
        tip.module.rules.fileLoader,
        tip.module.rules.sourceMapLoader,
        tip.module.rules.tsLodaer,
        tip.module.rules.babelLoaderBuild,
      ],
    },
    devServer: tip.devServer,
    plugins: [
      tip.plugins.ProvidePlugin,
      tip.plugins.HtmlWebpackPlugin,
      tip.plugins.DefinePlugin,
      !tip.isDev ? tip.plugins.FastUglifyJsPluginProd : tip.plugins.null,
      !tip.isDev ? tip.plugins.HotModuleReplacementPlugin : tip.plugins.null,
      !tip.isDev ? tip.plugins.CleanWebpackPlugin : tip.plugins.null,
      !tip.isDev ? tip.plugins.CopyWebpackPlugin : tip.plugins.null,
      !tip.isDev ? tip.plugins.HashedModuleIdsPlugin : tip.plugins.null,
      isHaveDll ? tip.plugins.DllReferencePlugin : tip.plugins.null,
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
