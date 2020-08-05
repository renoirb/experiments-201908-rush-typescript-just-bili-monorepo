const base = require('@renoirb/conventions-use-prettier')

/**
* Shareable Prettier configuration
*
* https://prettier.io/docs/en/options.html
* http://json.schemastore.org/prettierrc
* Match with .gitattributes AND .editorconfig
* https://prettier.io/docs/en/configuration.html#sharing-configurations
*
* @type {import('prettier').RequiredOptions}
*/
const main = {
  ...base,
  plugins: [
    require('prettier-plugin-organize-imports'),
  ]
}

module.exports = main
