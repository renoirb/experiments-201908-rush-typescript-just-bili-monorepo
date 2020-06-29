'use strict'

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

const ecmascript = require('./ecmascript')
const typescript = require('./typescript')

const plugins = [...ecmascript.plugins, ...typescript.plugins]

const main = {
  ...ecmascript,
  ...typescript,
  rules: {
    ...(ecmascript.rules || {}),
    ...(typescript.rules || {}),
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md#require-a-specific-member-delimiter-style-for-interfaces-and-type-literals-member-delimiter-style
        overrides: {
          interface: {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        },
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
  },
  plugins,
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx', '*.test.ts'],
      globals: {
        it: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
      },
    },
  ],
}

module.exports = main
