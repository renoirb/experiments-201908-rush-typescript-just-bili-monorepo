const ecmascript = require('./ecmascript');
const typescript = require('./typescript');

const plugins = [...ecmascript.plugins, ...typescript.plugins];
const main = {
  ...ecmascript,
  ...typescript,
  plugins,
};

module.exports = main;
