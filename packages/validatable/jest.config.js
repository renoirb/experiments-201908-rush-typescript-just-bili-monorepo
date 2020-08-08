const base = require('@renoirb/conventions-use-jest')

const main = {
  ...base,
  prettierPath:
    '<rootDir>/node_modules/@renoirb/conventions-code-formatter/node_modules/prettier/bin-prettier.js',
}

module.exports = main
