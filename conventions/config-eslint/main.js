/**
 * JavaScript/ECMAScript only ruleset.
 *
 * Since JavaScript does not understand TypeScript, we can't put
 * TypeScript rules alongside JavaScript, hence this separation.
 */
const javascript = {
  plugins: [
    // https://www.npmjs.com/package/eslint-plugin-promise
    "eslint-plugin-promise"
  ]
};

/**
 * TypeScript ruleset.
 *
 * https://eslint.org/blog/2019/01/future-typescript-eslint
 */
const typescript = {
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: "@typescript-eslint/parser",
  plugins: [
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    "@typescript-eslint",
    ...javascript.plugins
  ]
};

module.exports = { typescript, javascript };
