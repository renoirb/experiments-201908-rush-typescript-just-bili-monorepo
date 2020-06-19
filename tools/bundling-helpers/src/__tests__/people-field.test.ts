/* eslint-env jest */

import { PeopleField, stringifyAuthor } from '../people-field'

const peopleFieldCollectionFixture: ReadonlyArray<[
  PeopleField | string,
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

describe('people-field', () => {
  it('stringifyAuthor', () => {
    for (const [before, after] of peopleFieldCollectionFixture) {
      expect(stringifyAuthor(before)).toBe(after)
    }
  })
})
