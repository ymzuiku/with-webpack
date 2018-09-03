const { createConfig } = require('../scripts');
const cd = require('path').resolve;
module.exports = createConfig(
  {},
  {
    entry: {
      main: cd(process.cwd(), 'src/index.js'),
    },
  },
);
