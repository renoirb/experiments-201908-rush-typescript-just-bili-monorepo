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
  extends: ['@rushstack/eslint-config'],
  plugins: ['eslint-plugin-promise'],
}

module.exports = main
