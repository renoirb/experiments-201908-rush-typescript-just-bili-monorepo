/* eslint-env jest */

import { getProcessCliArgValuePair, MaybeNodeProcessContext } from '..'

describe('getProcessCliArgValuePair', () => {
  it('Snapshot', () => {
    const processFixture: MaybeNodeProcessContext = {
      argv: [
        '--foo',
        'bar',
        '--buz',
        '--config',
        '/path/to/fictious/tools/bundling-helpers/jest.config.js',
      ],
    }
    const subject = getProcessCliArgValuePair('--config', processFixture)
    expect(subject).toMatchSnapshot()
  })
  it('Missing CLI arguments returns null', () => {
    const subject = getProcessCliArgValuePair('--config')
    expect(subject).toBe(null)
  })
  it('Empty CLI arguments returns null', () => {
    // @ts-ignore
    const subject = getProcessCliArgValuePair('--config', { argv: [] })
    expect(subject).toBe(null)
  })
})
