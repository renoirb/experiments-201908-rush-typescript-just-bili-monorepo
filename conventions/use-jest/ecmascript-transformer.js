'use strict';

const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');

/**
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
