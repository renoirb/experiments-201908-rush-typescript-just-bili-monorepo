const base = require('@renoirb/conventions-use-eslint')

module.exports = {
  ...base,
  rules: {
    // See comments in @renoirb/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
