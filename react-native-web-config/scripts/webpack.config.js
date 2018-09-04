const { createConfig } = require('with-webpack');
const resolve = require('path').resolve;

module.exports = createConfig({
  entry: {
    main: resolve(process.cwd(), 'index.web.js'),
  },
});
