import { IPeopleField } from '../types'
import { stringifyAuthor, camelCase } from '../utils'

const peopleFieldCollectionFixture: ReadonlyArray<[
  IPeopleField | string,
  string,
]> = [
  [
    {
      email: 'ct@nx-01.starfleet',
      name: 'Charles Tucker',
      url: 'corado://nx-01.starfleet/engineering',
    },
    'Charles Tucker <ct@nx-01.starfleet> (corado://nx-01.starfleet/engineering)',
  ],
  [
    {
      email: '7.9@adjunct.3.unimatrix.1.borg',
      name: 'Seven Of Nine',
    },
    'Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>',
  ],
  [{ name: 'Data Soong' }, 'Data Soong'],
  [
    // Test url strip slash at the end
    {
      name: 'Data N. Soong',
      url: 'corado://ncc-1701-e.starfleet/bridge/conn/',
    },
    'Data N. Soong (corado://ncc-1701-e.starfleet/bridge/conn)',
  ],
]

const assertionsGroupAlpha: ReadonlyArray<[string, string]> = [
  ['foo-bar-bazz', 'fooBarBazz'],
]

describe('camelCase', () => {
  it('Happy-Path', () => {
    for (const [before, after] of assertionsGroupAlpha) {
      expect(camelCase(before)).toBe(after)
    }
  })
})

describe('stringifyAuthor', () => {
  it('Happy-Path', () => {
    for (const [before, after] of peopleFieldCollectionFixture) {
      expect(stringifyAuthor(before)).toBe(after)
    }
  })
})
