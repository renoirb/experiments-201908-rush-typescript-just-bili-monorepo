'use strict'

const { transform } = require('@babel/core')
const jestPreset = require('babel-preset-jest')

/**
 * MIGHT BE NOT NEEDED.
 *
 * It's best we make ALL projects as TypeScript with a `tsconfig.json` and
 * `{"compilerOptions":{"allowJs": true}}` so that we do not have to deal
 * with switching all projects.
 * Public projects might have to support more than one code-base to suit
 * projects using their libraries, in our case, we're deliberately choosing
 * to only write JavaScript through TypeScript.
 * Since TypeScript is JavaScript/ECMAScript by default, we're fine.
 * And we're saving the need to setup Babel to load ESM modules, whic complicates things.
 *
 * See https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
 *
 * Should one want to try again to support Babel directly, without TypeScript,
 * A **good amount of time** has been spent for this to work. It's not worthwile.
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
    })

    return result ? result.code : sourceText
  },
}

module.exports = main
