// babel.config.js
module.exports = {
  presets: [
    [require('bili/babel')],
    [
      '@babel/preset-env',
      {
        debug: true,
      },
    ],
  ],
}
