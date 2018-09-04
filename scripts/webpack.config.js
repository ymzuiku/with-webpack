const { createConfig } = require('../lib');
const resolve = require('path').resolve;

module.exports = createConfig({
  entry: {
    main: resolve(process.cwd(), 'test.tsx'),
  },
});
