const base = require('@frontend-bindings/conventions-use-eslint');

module.exports = {
  ...base,
  rules: {
    // For each project, we want to make obvious what's first to be worked on.
    // Ideally those lists should be empty.
    // Tests passing.
    // To try it out, comment one line, then run `rushx lint`.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
