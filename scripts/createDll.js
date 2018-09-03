const Tip = require('./Tip');

let islog = false;

module.exports = function(tip = new Tip()) {
  const package = require(tip.paths.package);
  const dllArray = package.dll || [];
  if (!islog) {
    islog = true;
    console.log('packing dll: ', dllArray);
  }
  return {
    mode: tip.isDev ? 'development' : 'production',
    entry: {
      dll: dllArray,
    },
    output: {
      path: tip.paths.dll,
      filename: '[name].js',
      library: '[name]_library',
    },
    resolve: {
      extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
      alias: {
        'react-native': 'react-native-web',
      },
      plugins: [],
    },
    module: {
      strictExportPresence: true,
      rules: [
        tip.module.rules.cssLoader,
        tip.module.rules.stylusLoader,
        tip.module.rules.urlLoader,
        tip.module.rules.fileLoader,
        tip.module.rules.sourceMapLoader,
        {
          test: /\.(js|jsx|mjs)$/,
          include: [
            /node_modules\/react-native-/,
            /node_modules\/react-native-web/,
          ],
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            compact: true,
            cacheDirectory: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['transform-class-properties', { spec: true }],
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: false,
                },
              ],
            ],
          },
        },
      ],
    },
    plugins: [tip.plugins.FastUglifyJsPluginProd, tip.plugins.DllPlugin],
  };
};
