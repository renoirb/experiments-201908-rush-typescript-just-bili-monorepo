/* eslint-env jest */

import { camelCase } from '../manipulation'

const assertionsGroupAlpha: ReadonlyArray<[string, string]> = [
  ['foo-bar-bazz', 'fooBarBazz'],
]

describe('manipulation', () => {
  it('stringifyAuthor', () => {
    for (const [before, after] of assertionsGroupAlpha) {
      expect(camelCase(before)).toBe(after)
    }
  })
})
