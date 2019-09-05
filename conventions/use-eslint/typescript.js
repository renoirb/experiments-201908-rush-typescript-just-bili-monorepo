// See https://github.com/microsoft/tsdoc/blob/master/playground/.eslintrc.js#L2
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@microsoft/eslint-config-scalable-ts/patch-eslint6');

/**
 * TypeScript ruleset.
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
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: [
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    '@typescript-eslint/eslint-plugin',
  ],
};

module.exports = main;
