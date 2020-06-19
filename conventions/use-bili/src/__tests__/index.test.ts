/* eslint-env jest */

import { main } from '../main'

describe('main', () => {
  jest.spyOn(process, 'cwd').mockImplementation(() => __dirname)
  it('Snapshot sample', () => {
    const index = 'foo/bar/baz/buzz/bizz.ts'
    const subject = main(index)(process)
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty('input', {
      index,
    })
  })
})
