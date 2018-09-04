# with-webpack

开箱即用的 webpack，并且可以二次自定义配置, 和预制插件。

## Install

```sh
$ npm i --save with-webpack
```

## Use React (Javascript or Typescript)

### Create configs

**Make project tree like this:**

```
public |
    --index.html;
src |
    --index.js;
scripts |
    --webpack.config.js;
    --webpack.dll.js;
```

**Edit file:**

scripts/webpack.config.js

```js
const { createConfig } = require('with-webpack');
const resolve = require('path').resolve;

module.exports = createConfig({
  entry: {
    main: resolve(__dirname, '../src/index.js'),
    // main: resolve(__dirname, '../src/index.tsx'), if you use typescript
  },
});
```

scripts/webpack.dll.js

```js
const { createDll } = require('with-webpack');

module.exports = createDll();
```


public/index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    />
    <title>React App</title>
    <script src="./dll/dll.js"></script>
    <style>
        html,
        body {
            margin: 0px;
            padding: 0px;
            height: 100%;
        }

        #root {
            display: flex;
            height: 100%;
            width: 100%;
        }
    </style>
</head>

<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
</body>

</html>
```

### Add package.json

```
"dll": [
    "react",
    "react-dom",
    // Add any static package, Use `npm run dll` build dll.js
],
"scripts": {
    "web": "webpack-dev-server --config scripts/webpack.config.js",
    "dll": "webpack --progress --config scripts/webpack.dll.js",
    "build": "prod=1 webpack -config scripts/webpack.config.js",
    "test": "jest"
  },
```

run script

```sh
$ npm run dll # build dll.js in public/dll
$ npm run web
```

## Use react-native-web

Create react-native project:

```sh
$ react-native init MyProject
$ cd MyProject
```

Use typescript and react-native-web, you need install:

```sh
$ yarn add --dev typescript react-native-typescript-transformer ts-jest @types/react @types/react-native @types/react-dom @types/jest @types/react-test-renderer
$ yarn add with-webpack
```

Copy default react-native-web-config

```sh
$ cp -rf node_modules/with-webpack/react-native-web-config/* ./
```

Add package.json:

```json
"dll": [
    "react",
    "react-dom",
    "react-art",
    "react-native-web"
],
"scripts": {
    "web": "webpack-dev-server --config scripts/webpack.config.js",
    "dll": "webpack --progress --config scripts/webpack.dll.js",
    "build": "prod=1 webpack -config scripts/webpack.config.js",
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "ios": "react-native run-ios --simulator=\"iPhone X\"",
    "android": "react-native run-android",
    "test": "jest"
  },
```

Run iOS project:

```sh
$ npm run dll
$ npm run ios
```
