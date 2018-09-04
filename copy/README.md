# add package.json

```json
"scripts": {
    "web": "webpack-dev-server --config scripts/webpack.config.js",
    "dll": "webpack --progress --config scripts/webpack.dll.js",
    "build": "prod=1 webpack -config scripts/webpack.config.js"
  },
```
