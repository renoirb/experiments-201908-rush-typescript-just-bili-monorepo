const base = require('./main')

module.exports = {
  ...base,
  rules: {
    // See comments in @frontend-bindings/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/no-var-requires': 'off',
  },
}
