const path = require('path');

/**
 * https://github.com/microsoft/just/blob/master/scripts/jest.config.js
 *
 * @type {import('jest').DefaultOptions}
 */
module.exports = {
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
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.jsx?$': path.join(__dirname, 'ecmascript-transformer.js'),
  },
  reporters: [path.join(__dirname, 'reporter.js')],
  verbose: true,
};
