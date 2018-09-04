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

function createConfig(nextConfig = createConfigFn(), inputTip = new Tip()) {
  const tip = deepMerge(new Tip(), inputTip);
  console.log('create webpack config, isDev:', tip.isDev);
  return deepMerge(createConfigFn(tip), nextConfig);
}

function createDll(nextConfig = createDllFn(), inputTip = new Tip()) {
  const tip = deepMerge(new Tip(), inputTip);
  console.log('create webpack dll, isDev:', tip.isDev);
  return deepMerge(createDllFn(tip), nextConfig);
}

module.exports = {
  createConfig,
  createDll,
  deepMerge,
  Tip,
};
