/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@renoirb/conventions-use-eslint')

const main = {
  ...base,
  rules: {
    ...base.rules,
    // TODO: Make this list smaller, not bigger
    // To try it out, comment one line, then run `rushx lint`.
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
}

module.exports = main
