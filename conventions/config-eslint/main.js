/**
 * JavaScript/ECMAScript only ruleset.
 *
 * Since JavaScript does not understand TypeScript, we can't put
 * TypeScript rules alongside JavaScript, hence this separation.
 */
module.exports = {
  plugins: [
    // https://www.npmjs.com/package/eslint-plugin-promise
    "eslint-plugin-promise"
  ]
};
