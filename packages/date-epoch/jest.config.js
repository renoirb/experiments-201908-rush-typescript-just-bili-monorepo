/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('@renoirb/conventions-use-jest')

const main = {
  ...base,
  setupFiles: ['jest-date-mock'],
}

module.exports = main
