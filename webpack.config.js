const { createConfig, Tip } = require('./scripts');
const tip = new Tip();
const path = require('path');
module.exports = createConfig(tip, {
  entry: {
    main: path.resolve(process.cwd(), 'src/index.tsx'),
  },
});
