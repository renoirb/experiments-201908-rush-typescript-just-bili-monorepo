/**
 * Boilerplate ESLint config, adjust to your requirements
 * See: https://www.npmjs.com/package/@renoirb/conventions-use-eslint
 */
const base = require('@renoirb/conventions-use-eslint')

/**
 * @type {import('@types/eslint').Linter.Config}
 */
const main = {
  ...base,
  parserOptions: {
    ...(base.parserOptions || {}),
    tsconfigRootDir: process.cwd(),
    project: 'tsconfig.eslint.json',
  },
  rules: {
    ...base.rules,
    // TODO: Make this list smaller, not bigger
    '@typescript-eslint/typedef': 'off',
    'no-new': 'off',
  },
}

module.exports = main
