/**
 * Shareable Prettier configuration
 *
 * https://prettier.io/docs/en/options.html
 * http://json.schemastore.org/prettierrc
 * Match with .gitattributes AND .editorconfig
 * https://prettier.io/docs/en/configuration.html#sharing-configurations
 */
module.exports = {
  printWidth: 80,
  trailingComma: 'all',
  semi: true,
  endOfLine: 'lf',
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.aspx,cmd,config,cs,csproj,ps1,rels,resx,sln',
      options: {
        endOfLine: 'clrf',
      },
    },
  ],
};
