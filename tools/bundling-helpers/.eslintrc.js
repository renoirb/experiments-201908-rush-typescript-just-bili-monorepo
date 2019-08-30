// See https://github.com/microsoft/tsdoc/blob/master/playground/.eslintrc.js#L2
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@microsoft/eslint-config-scalable-ts/patch-eslint6');

const typescript = require('@frontend-bindings/conventions-config-eslint/typescript');

module.exports = {
  ...typescript,
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    // It would be nice to not allow explicit any, or no @ts-ignore, but, gotta ship.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
