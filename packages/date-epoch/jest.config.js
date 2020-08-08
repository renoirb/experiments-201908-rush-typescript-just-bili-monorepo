/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@renoirb/conventions-use-jest')

const main = {
  ...base,
  setupFiles: ['jest-date-mock'],
  prettierPath: '<rootDir>/node_modules/@renoirb/conventions-code-formatter/node_modules/prettier/bin-prettier.js',
}

module.exports = main
