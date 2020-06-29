'use strict'

/**
 * JavaScript/ECMAScript only ruleset.
 *
 * Since JavaScript does not understand TypeScript, we can't put
 * TypeScript rules alongside JavaScript, hence this separation.
 *
 * @type {import('@types/eslint').Linter.Config}
 */
const main = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // https://www.npmjs.com/package/@typescript-eslint/parser
  extends: ['@rushstack/eslint-config'],
  plugins: [
    // https://www.npmjs.com/package/eslint-plugin-promise
    'eslint-plugin-promise',
    '@rushstack/eslint-plugin',
    '@typescript-eslint/eslint-plugin',
  ],
}

module.exports = main
