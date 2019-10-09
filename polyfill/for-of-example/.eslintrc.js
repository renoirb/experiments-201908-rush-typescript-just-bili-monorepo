const base = require('@renoirb/conventions-use-eslint')

module.exports = {
  ...base,
  rules: {
    // See comments in @renoirb/tools-bundling-helpers .eslintrc.js
    // @TODO: Make sure this is smallest as possible
    // Check with `rushx lint`
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
  },
}
