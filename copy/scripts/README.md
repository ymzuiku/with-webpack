# with-webpack

开箱即用的webpack，并且可以二次自定义配置, 和预制插件。

## Install

```sh
$ npm i --save with-webpack
```

## Create configs

**Make project tree like this:**

```js
public \
  -- index.html
src \
  -- index.js
scripts \
  -- webpack.config.js
  -- webpack.dll.js
```

**Edit scripts**

scripts/webpack.config.js
```js
const { createConfig } = require('with-webpack');
const resolve = require('path').resolve;

module.exports = createConfig({
    entry:{
        main:resolve(__dirname, '../src/index.js')
    }
});
```
scripts/webpack.dll.js
```js
const { createDll } = require('with-webpack');

module.exports = createDll();
```

## Add package.json

```json
"scripts": {
    "web": "webpack-dev-server --config scripts/webpack.config.js",
    "dll": "webpack --progress --config scripts/webpack.dll.js",
    "build": "prod=1 webpack -config scripts/webpack.config.js"
  },
```

run script
```sh
npm run dll
npm run web
```

## Use typescript

with-webpack is have tsloader in webpack, and other your need read this document:

[facebook.github.io/using-typescript-with-react-native](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native.html)
