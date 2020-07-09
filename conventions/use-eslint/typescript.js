'use strict'

const { normalize, resolve } = require('path')
const { existsSync } = require('fs')

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
  extends: ['@rushstack/eslint-config'],
  plugins: [
    'eslint-plugin-promise',
    'eslint-plugin-security',
    'eslint-plugin-tsdoc',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
}

const tsconfigRootDir = process.cwd()
const projectHasTsConfigFullPath = normalize(
  resolve(tsconfigRootDir, 'tsconfig.eslint.json'),
)
if (existsSync(projectHasTsConfigFullPath)) {
  main.parserOptions = {
    tsconfigRootDir,
    project: './tsconfig.eslint.json',
  }
}

module.exports = main
