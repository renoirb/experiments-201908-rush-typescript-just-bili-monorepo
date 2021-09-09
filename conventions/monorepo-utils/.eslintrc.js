// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

/**
 * Bookmarks:
 * - https://rushstack.io/pages/heft_tasks/eslint/
 * - https://www.npmjs.com/package/@rushstack/eslint-config
 *
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  parserOptions: { tsconfigRootDir: __dirname },
  extends: [
    '@rushstack/eslint-config/profile/node-trusted-tool',
    '@rushstack/eslint-config/mixins/friendly-locals',
  ],
  rules: {
    // Rules that might want to be shared
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // TODO: Make this list smaller, not bigger
    // ...
  },
}
