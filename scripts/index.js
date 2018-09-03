const createConfigFn = require('./createConfig');
const createDllFn = require('./createDll');
const Tip = require('./Tip');

function deepMerge(a, b) {
  for (var k in b) {
    var t = a[k] && Object.prototype.toString.call(a[k]);
    a[k] =
      t === '[object Object]'
        ? deepMerge(a[k], b[k])
        : t === '[object Array]'
          ? deepMerge(a[k], b[k])
          : (a[k] = b[k]);
  }
  return a;
}

function createConfig(inputTip = new Tip(), nextConfig = createConfigFn()) {
  const tip = deepMerge(new Tip(), inputTip);
  console.log('create webpack config, isDev:', tip.isDev);
  return deepMerge(createConfigFn(tip));
}

function createDll(inputTip = new Tip(), nextConfig = createDllFn()) {
  const tip = deepMerge(new Tip(), inputTip);
  console.log('create webpack dll, isDev:', tip.isDev);
  return deepMerge(createDllFn(tip));
}

module.exports = {
  createConfig,
  createDll,
  deepMerge,
  Tip,
};
