const base = require('@frontend-bindings/conventions-use-typescript-eslint');

module.exports = {
  ...base,
  rules: {
    // TODO: Figure out why this is not needed anymore.
    // It would be nice to not allow explicit any, or no @ts-ignore, but, gotta ship.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
