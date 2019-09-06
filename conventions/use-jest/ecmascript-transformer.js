'use strict';

const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');

/**
 * MIGHT BE NOT NEEDED.
 * If we can take ANY JavaScript project, and make them leverage TypeScript allowJs
 * We will not need this file at all.
 *
 * See https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
 *
 * ----
 *
 * Transform ECMAScript code
 * Which will prevent us adding a `babel.config.js` inside non
 * TypeScript projects.
 *
 * Refer to the following links for typings info:
 * - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jest/index.d.ts#L1835
 * - https://github.com/facebook/jest/blob/master/docs/TutorialReact.md#custom-transformers
 *
 * @types {import('@jest/types').Transformer}
 */
const main = {
  process(sourceText, filename) {
    const result = transform(sourceText, {
      filename,
      presets: [jestPreset],
    });

    return result ? result.code : sourceText;
  },
};

module.exports = main;
