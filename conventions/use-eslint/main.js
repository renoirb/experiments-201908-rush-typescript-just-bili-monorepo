/**
 * JavaScript/ECMAScript only ruleset.
 *
 * Since JavaScript does not understand TypeScript, we can't put
 * TypeScript rules alongside JavaScript, hence this separation.
 *
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  plugins: [
    // https://www.npmjs.com/package/eslint-plugin-promise
    'eslint-plugin-promise',
  ],
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],
      globals: {
        it: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
      },
    },
  ],
};
