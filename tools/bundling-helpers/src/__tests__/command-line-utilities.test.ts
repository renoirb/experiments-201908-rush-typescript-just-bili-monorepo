/* eslint-env jest */

import { CommandLineUtilities } from '../command-line-utilities'

describe('getProcessCliArgValuePair', () => {
  let oldArgv: string[] = []

  beforeAll(() => {
    oldArgv = [...process.argv]
    process.argv = [
      '--foo',
      'bar',
      '--buz',
      '--config',
      '/some/ficticious/path/to/file.json',
    ]
  })

  afterAll(() => {
    process.argv = oldArgv
  })

  it('Snapshot', () => {
    const subject = CommandLineUtilities.getCliArg('--config')
    expect(subject).toMatchObject([
      '--config',
      '/some/ficticious/path/to/file.json',
    ])
    expect(subject).toMatchSnapshot()
  })

  it('Missing CLI arguments returns false', () => {
    const subject = CommandLineUtilities.getCliArg('--not-present-arg')
    expect(subject).toBe(false)
  })

  it('Empty CLI arguments returns false', () => {
    const subject = CommandLineUtilities.getCliArg(' ')
    expect(subject).toBe(false)
  })

  it(`Argument less CLI argument if present is tuple name and value as boolean true ['--buz', true]`, () => {
    const subject = CommandLineUtilities.getCliArg('--buz')
    expect(subject).toMatchObject(['--buz', true])
  })

  it(`CLI argument with non value returns tuple name and value`, () => {
    const subject = CommandLineUtilities.getCliArg('--foo')
    expect(subject).toMatchObject(['--foo', 'bar'])
  })
})
