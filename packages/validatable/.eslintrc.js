const base = require('@frontend-bindings/conventions-use-eslint');

module.exports = {
  ...base,
  rules: {
    // See comments in @frontend-bindings/tools-bundling-helpers .eslintrc.js
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
