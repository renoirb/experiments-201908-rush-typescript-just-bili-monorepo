'use strict'

const { resolve, join, normalize } = require('path')

const packageJson = resolve(normalize(join(process.cwd(), 'package.json')))
const tsConfig = resolve(normalize(join(process.cwd(), 'tsconfig.json')))
const prettierPath = resolve(
  normalize(
    join(
      process.cwd(),
      '/node_modules/@renoirb/conventions-use-prettier/bin/prettier',
    ),
  ),
)

const processEnvKeys = Object.keys(process.env)
const isCI = processEnvKeys.includes('CI_SERVER')
const verbose = !isCI

/**
 * https://github.com/microsoft/just/blob/master/scripts/jest.config.js
 *
 * Bookmarks:
 * - https://www.grzegorowski.com/custom-jest-transformer
 * - https://github.com/joscha/ts-jest-transformer-example/blob/master/tools/fileTransformer.js
 * - https://github.com/joscha/ts-jest-transformer-example/blob/master/jestconfig.json
 * - https://github.com/jmarceli/custom-jest-transformer/blob/master/jest-csv-transformer.js
 * - https://github.com/kristerkari/react-native-svg-transformer#usage-with-jest
 * - https://jestjs.io/docs/en/manual-mocks
 *
 * @type {import('jest').DefaultOptions}
 */
const main = {
  clearMocks: true,
  expand: true,
  forceExit: true,
  prettierPath,
  globals: {
    'ts-jest': {
      tsConfig,
      packageJson,
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-expect-message'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleNameMapper: {
    '\\.(csv)$': join(__dirname, 'csv-transformer.js'),
    '\\.(txt)$': join(__dirname, 'test-file-stub.js'),
  },
  transform: {
    // See comment in ecmascript-transformer.js
    '\\.(ts|js)x?$': 'ts-jest',
  },
  verbose,
}

if (isCI) {
  // If we do not superseed the reporters, we might get errors when
  main.reporters = [normalize(join(__dirname, 'reporter.js'))]
}

// console.log('use-jest', { isCI, reporters: [...main.reporters], verbose })

module.exports = main
