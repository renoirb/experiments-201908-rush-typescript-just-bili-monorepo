const base = require('@frontend-bindings/conventions-use-typescript-eslint');

module.exports = {
  ...base,
  rules: {
    // See comments in @frontend-bindings/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
