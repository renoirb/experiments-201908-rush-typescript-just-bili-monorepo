const base = require('@renoirb/conventions-use-jest')

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
const main = {
  ...base,
  prettierPath: '<rootDir>/node_modules/prettier/bin-prettier.js',
}

module.exports = main
