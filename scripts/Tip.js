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
      src: path.resolve(process.cwd(), 'src'),
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
      port: 3300,
      host: '0.0.0.0',
      useLocalIp: true,
      hot: true,
      open: false,
      progress: false,
      openPage: '/',
      allowedHosts: [],
      headers: {},
      disableHostCheck: false,
      compress: false,
      clientLogLevel: 'info',
      https: false,
      lazy: false,
      before: function(app) {},
      after: function(app) {},
      quiet: false, //屏蔽所有错误,控制台中输出打包的信息
      inline: true, //开启页面自动刷新
      stats: 'errors-only',
      // stats: {
      //   // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
      //   // 添加构建日期和构建时间信息
      //   builtAt: true,
      //   // 添加缓存（但未构建）模块的信息
      //   cached: true,
      //   // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
      //   cachedAssets: false,
      //   // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      //   chunks: false,
      //   // 添加 namedChunkGroups 信息
      //   chunkGroups: false,
      //   // 将构建模块信息添加到 chunk 信息
      //   chunkModules: false,
      //   // 添加 chunk 和 chunk merge 来源的信息
      //   chunkOrigins: false,
      //   // 用于缩短 request 的上下文目录
      //   // context: '../src/',
      //   // `webpack --colors` 等同于
      //   colors: true,
      //   // 显示每个模块到入口起点的距离(distance)
      //   depth: false,
      //   // 通过对应的 bundle 显示入口起点
      //   entrypoints: false,
      //   // 添加 --env information
      //   env: true,
      //   // 添加错误信息
      //   errors: true,
      //   // 添加错误的详细信息（就像解析日志一样）
      //   errorDetails: true,
      //   // 添加 compilation 的哈希值
      //   hash: false,
      //   // 设置要显示的模块的最大数量
      //   maxModules: 15,
      //   // 添加构建模块信息
      //   modules: false,
      //   // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
      //   moduleTrace: true,
      //   // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
      //   performance: false,
      //   // 显示模块的导出
      //   providedExports: false,
      //   // 添加 public path 的信息
      //   publicPath: false,
      //   // 添加模块被引入的原因
      //   reasons: false,
      //   // 添加模块的源码
      //   source: true,
      //   // 添加时间信息
      //   timings: false,
      //   // 显示哪个模块导出被用到
      //   usedExports: false,
      //   // 添加 webpack 版本信息
      //   version: false,
      //   // 添加警告
      //   warnings: true,
      //   // 过滤警告显示（从 webpack 2.4.0 开始），
      //   // 可以是 String, Regexp, 一个获取 warning 的函数
      //   // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
      //   // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
      // },
      noInfo: false,
      proxy: {
        '/api-proxy': 'http://localhost:7000',
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
        babelLoader: {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          // include: [
          //   /node_modules\/react-navigation/,
          //   /node_modules\/react-native-/,
          // ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              comments: isDev ? false : true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
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
        minify: {
          removeAttributeQuotes: true, // 移除属性的引号
        },
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
        cacheFolder: path.resolve(this.paths.root, './.cache'),
      }),
      FastUglifyJsPluginDev: new FastUglifyJsPlugin({
        compress: false,
        debug: true,
        cache: true,
        sourceMap: true,
        cacheFolder: path.resolve(this.paths.root, './.cache'),
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
