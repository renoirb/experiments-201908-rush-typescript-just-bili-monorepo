const base = require('./ecmascript')

const main = {
  ...base,
  rules: {
    ...base.rules,
    // TODO: Make this list smaller, not bigger
    // To try it out, comment one line, then run `rushx lint`.
    '@typescript-eslint/no-var-requires': 'off',
  },
}

module.exports = main
