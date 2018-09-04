const { createConfig } = require('../config');
const cd = require('path').resolve;

module.exports = createConfig({
  entry: {
    main: cd(process.cwd(), 'src/index.tsx'),
  },
});
