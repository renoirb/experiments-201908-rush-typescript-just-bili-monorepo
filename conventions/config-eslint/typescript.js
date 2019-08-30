const javascript = require("./main");

/**
 * TypeScript ruleset.
 *
 * https://eslint.org/blog/2019/01/future-typescript-eslint
 */
module.exports = {
  // https://www.npmjs.com/package/@typescript-eslint/parser
  parser: "@typescript-eslint/parser",
  plugins: [
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    "@typescript-eslint",
    ...javascript.plugins
  ]
};
