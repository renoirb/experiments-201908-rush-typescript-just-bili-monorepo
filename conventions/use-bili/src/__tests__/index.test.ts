/* eslint-env jest */

import { main } from '../main'
import * as path from 'path'

jest
  .spyOn(process, 'cwd')
  .mockImplementation(() => path.resolve(__dirname, '..'))

/**
 * Mocking the filesystem
 *
 * Bookmarks:
 * https://jestjs.io/docs/en/manual-mocks#examples
 */
// jest.mock('fs')
// jest.mock('@rushstack/node-core-library')

const bizz = 'src/bar/baz/buzz/bizz.ts'
const index = 'src/index.ts'

describe('main', () => {
  it('Snapshot sample', () => {
    const subject = main({ input: index })
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty('input', index)
  })
  it('When input has more than one item', () => {
    const subject = main({ input: { index, bizz } })
    expect(subject).toHaveProperty('input', { index, bizz })
  })
})
