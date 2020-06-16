/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@renoirb/conventions-use-eslint')

const main = {
  ...base,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    ...base.rules,
    // For each project, we want to make obvious what's first to be worked on.
    // Ideally those lists should be empty.
    // Tests passing.
    // To try it out, comment one line, then run `rushx lint`.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/typedef': 'off',
  },
}

module.exports = main
