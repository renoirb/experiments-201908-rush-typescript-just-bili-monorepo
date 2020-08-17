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
  endOfLine: 'lf',
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        proseWrap: 'always',
      },
    },
    {
      files: '*.aspx,cmd,config,cs,csproj,ps1,rels,resx,sln',
      options: {
        endOfLine: 'clrf',
      },
    },
  ],
}

module.exports = main
