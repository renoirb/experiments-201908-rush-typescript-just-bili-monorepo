// See https://github.com/microsoft/tsdoc/blob/master/playground/.eslintrc.js#L2
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@microsoft/eslint-config-scalable-ts/patch-eslint6');

const base = require('@frontend-bindings/conventions-use-eslint');

/**
 * TypeScript ruleset.
 *
 * https://eslint.org/blog/2019/01/future-typescript-eslint
 *
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  ...base,
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: [
    ...(base.plugins || []),
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    '@typescript-eslint/eslint-plugin',
  ],
  overrides: [
    {
      files: ['*.test.js', '*.test.ts', '*.test.tsx', '*.test.jsx'],
      globals: {
        it: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
      },
    },
  ],
};
