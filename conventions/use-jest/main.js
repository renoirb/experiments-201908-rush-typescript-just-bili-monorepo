const path = require('path');

const jestModuleDir = __dirname;

/**
 * https://github.com/microsoft/just/blob/master/scripts/jest.config.js
 *
 * @type {import('jest').DefaultOptions}
 */
const main = {
  clearMocks: true,
  expand: true,
  forceExit: true,
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(process.cwd(), 'tsconfig.json'),
      packageJson: path.resolve(process.cwd(), 'package.json'),
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-expect-message'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    // '\\.jsx?$': path.join(jestModuleDir, 'ecmascript-transformer.js'),
    '\\.(ts|js)x?$': 'ts-jest',
  },
  reporters: [path.join(jestModuleDir, 'reporter.js')],
  verbose: true,
};

module.exports = main;
