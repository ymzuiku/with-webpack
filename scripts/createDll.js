const Tip = require('./Tip');

module.exports = function(tip = new Tip()) {
  const package = require(tip.paths.package);
  const dllArray = package.dll || [];
  console.log('packing dll: ', dllArray);
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
        {
          test: /\.(js|jsx|mjs)$/,
          include: [
            /node_modules\/react-native-/,
            /node_modules\/react-native-web/,
            /node_modules\/react-navigation/,
          ],
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            compact: true,
            cacheDirectory: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [tip.plugins.FastUglifyJsPluginProd, tip.plugins.DllPlugin],
  };
};
