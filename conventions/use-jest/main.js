const { resolve, join, normalize } = require('path');

const jestModuleDir = __dirname;
const prettierPath =
  '/node_modules/@frontend-bindings/conventions-use-prettier/bin/prettier';

const processEnvKeys = Object.keys(process.env);
const isCI = processEnvKeys.includes('CI_SERVER');
const verbose = !isCI;

/**
 * https://github.com/microsoft/just/blob/master/scripts/jest.config.js
 *
 * @type {import('jest').DefaultOptions}
 */
const main = {
  clearMocks: true,
  expand: true,
  forceExit: true,
  prettierPath: resolve(normalize(join(__dirname, prettierPath))),
  globals: {
    'ts-jest': {
      tsConfig: resolve(process.cwd(), 'tsconfig.json'),
      packageJson: resolve(process.cwd(), 'package.json'),
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-expect-message'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testRegex: '__tests__/.*\\.(test|spec)\\.(jsx?|tsx?)$',
  transform: {
    // See comment in ecmascript-transformer.js
    // '\\.jsx?$': path.join(jestModuleDir, 'ecmascript-transformer.js'),
    '\\.(ts|js)x?$': 'ts-jest',
  },
  verbose,
};

if (isCI) {
  // If we do not superseed the reporters, we might get errors when
  main.reporters = [join(jestModuleDir, 'reporter.js')];
}

// console.log('use-jest', { isCI, reporters: [...main.reporters], verbose })

module.exports = main;
