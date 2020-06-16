/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@renoirb/conventions-use-eslint')

const main = {
  ...base,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  rules: {
    ...base.rules,
    // See comments in @renoirb/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/typedef': 'off',
  },
}

module.exports = main
