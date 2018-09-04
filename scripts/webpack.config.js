const { createConfig } = require('../lib');
const cd = require('path').resolve;

module.exports = createConfig({
  entry: {
    main: cd(process.cwd(), 'test.tsx'),
  },
});
