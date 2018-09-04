const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FastUglifyJsPlugin = require('fast-uglifyjs-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

function host() {
  const interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    const face = interfaces[devName];
    for (let i = 0; i < face.length; i++) {
      const alias = face[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

const isDev = process.env.prod != '1';

class Tip {
  constructor() {
    this.paths = {
      root: process.cwd(),
      output: path.resolve(process.cwd(), 'build'),
      public: path.resolve(process.cwd(), 'public'),
      // src: path.resolve(process.cwd(), 'src'),
      package: path.resolve(process.cwd(), 'package.json'),
      entry: path.resolve(process.cwd(), 'src/index.js'),
      dll: path.resolve(process.cwd(), 'public/dll'),
      template: path.resolve(process.cwd(), 'public/index.html'),
    };
    this.isDev = isDev;
    this.tsconfig = {
      compilerOptions: {
        target: 'es3',
        module: 'esnext',
        noImplicitAny: true,
        removeComments: true,
        preserveConstEnums: true,
        jsx: 'react',
        sourceMap: true,
      },
      include: ['./src/**/*'],
      exclude: ['node_modules', '**/*.spec.ts'],
    };
    this.host = host();
    this.port = 3300;
    this.stats = {
      errorsOnly: 'errors-only',
    };
    this.target = {
      web: 'web',
      node: 'node',
    };
    this.mode = {
      none: 'none',
      development: 'development',
      production: 'production',
    };
    this.devtool = {
      none: undefined,
      eval: 'eval',
      sourceMap: 'source-map',
      inlineSourceMap: 'inline-source-map',
      cheapModuleEvalSourceMap: 'cheap-module-eval-source-map',
    };
    this.devServer = {
      contentBase: this.paths.public,
      watchContentBase: true,
      port: this.port,
      host: '0.0.0.0',
      useLocalIp: true,
      // hot: true, //开启有可能不显示内容
      open: false,
      progress: true,
      openPage: '/',
      allowedHosts: [],
      headers: {},
      disableHostCheck: false,
      compress: true,
      clientLogLevel: 'info',
      https: false,
      lazy: false,
      before: function(app) {},
      after: function(app) {},
      quiet: false, //屏蔽所有错误,控制台中输出打包的信息
      inline: true, //开启页面自动刷新
      stats: 'errors-only',
      noInfo: false,
      proxy: {
        // '/api-proxy': 'http://localhost:7000',
      },
    };
    this.resolve = {
      extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
      alias: {
        'react-native': 'react-native-web',
      },
    };
    this.module = {
      rules: {
        tsLodaer: {
          test: /\.(tsx|ts)?$/,
          loader: 'ts-loader',
          // options: {
          //   transpileOnly: true,
          // },
        },
        // .babelrc
        babelLoaderBuild: {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              comments: isDev ? false : true,
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
                [
                  'module-resolver',
                  {
                    alias: {
                      '^react-native$': 'react-native-web',
                    },
                  },
                ],
              ],
            },
          },
        },
        babelLoaderDll: {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: [
            /node_modules\/react-native-/,
            /node_modules\/react-native-web/,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              comments: true,
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
                [
                  'module-resolver',
                  {
                    alias: {
                      '^react-native$': 'react-native-web',
                    },
                  },
                ],
              ],
            },
          },
        },
        sourceMapLoader: {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          loader: 'source-map-loader',
        },
        urlLoader: {
          test: /\.(png|svg|jpg|gif|pdf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        fileLoader: {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        cssLoader: {
          test: /\.css$/,
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        },
        stylusLoader: {
          test: /\.styl$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'stylus-loader',
              options: {
                strictMath: true,
                noIeCompat: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        },
        lessLoader: {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'less-loader',
              options: {
                strictMath: true,
                noIeCompat: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        },
      },
    };
    this.plugins = {
      HashedModuleIdsPlugin: new webpack.HashedModuleIdsPlugin(),
      ProvidePlugin: new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
      }),
      HtmlWebpackPlugin: new HtmlWebpackPlugin({
        template: this.paths.template,
        minify: true,
        // minify: {
        //   removeAttributeQuotes: false, // 移除属性的引号
        // },
      }),
      null: new webpack.DefinePlugin({
        __DEV__: false,
      }),
      DefinePlugin: new webpack.DefinePlugin({
        __DEV__: false,
      }),
      HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin(),
      FastUglifyJsPluginProd: new FastUglifyJsPlugin({
        compress: {
          warnings: false,
        },
        debug: false,
        cache: false,
        sourceMap: false,
        cacheFolder: path.resolve(this.paths.root, './node_modules/.cache'),
      }),
      FastUglifyJsPluginDev: new FastUglifyJsPlugin({
        compress: false,
        debug: true,
        cache: true,
        sourceMap: true,
        cacheFolder: path.resolve(this.paths.root, './node_modules/.cache'),
      }),
      CleanWebpackPlugin: new CleanWebpackPlugin(['*'], {
        root: path.resolve(this.paths.root, `./build/`),
        exclude: ['video'],
        verbose: true,
        dry: false,
      }),
      DllReferencePlugin: new webpack.DllReferencePlugin({
        manifest: path.resolve(this.paths.dll, 'dll-manifest.json'),
      }),
      DllPlugin: new webpack.DllPlugin({
        path: path.resolve(this.paths.dll, 'dll-manifest.json'),
        name: 'dll_library',
      }),
      CopyWebpackPlugin: new CopyWebpackPlugin([
        {
          from: this.paths.public,
          to: this.paths.output,
        },
      ]),
    };
  }
}

module.exports = Tip;
