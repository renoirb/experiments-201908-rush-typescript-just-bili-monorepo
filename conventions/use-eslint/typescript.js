'use strict'

/**
 * TypeScript only ruleset.
 *
 * https://eslint.org/blog/2019/01/future-typescript-eslint
 *
 * Reason there are two blocks is that during initial experiments,
 * I wanted two eslint plugins. One for TypeScript code, another
 * for ECMAScript. Then realized that TypeScript CAN support ECMASCript
 * projects. All we need is to have a `{"allowJs": true}` in tsconfig.json.
 * Which then removes the need to have to support both babel and TypeScript,
 * but instead use exactly the same.
 *
 * https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
 *
 * @type {import('@types/eslint').Linter.Config}
 */
const main = {
  parserOptions: {
    tsconfigRootDir: process.cwd(),
    project: './tsconfig.eslint.json',
  },
  // https://www.npmjs.com/package/@typescript-eslint/parser
  extends: ['@rushstack/eslint-config'],
  parser: '@typescript-eslint/parser',
  plugins: [
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    '@rushstack/eslint-plugin',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-promise',
    'eslint-plugin-security',
    'eslint-plugin-tsdoc',
  ],
}

module.exports = main
