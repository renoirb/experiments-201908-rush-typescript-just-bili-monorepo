const base = require('./main')

module.exports = {
  ...base,
  rules: {
    // See comments in @renoirb/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/no-var-requires': 'off',
  },
}
