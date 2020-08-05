import { FileSystem } from '@rushstack/node-core-library'
import { CommandLineAction } from '@rushstack/ts-command-line'
import path from 'path'

import {
  CodeFormatterCommandLineParser,
  CommandLineParser,
} from '../command-line-parser'

jest.mock('@rushstack/node-core-library')
jest.mock('child_process')
jest.spyOn(console, 'log').mockImplementation(() => undefined)

describe('CodeFormatterCommandLineParser', () => {
  let commandLineParser: CommandLineParser
  let fileSystemExistsSpy = jest.spyOn(FileSystem, 'exists')
  let resolveSpy = jest.spyOn(path, 'resolve')

  it('parses an action input with remainder', () => {
    resolveSpy.mockReturnValueOnce('/fakepath/to/prettier.config.js')
    fileSystemExistsSpy.mockImplementation(() => true)

    commandLineParser = new CodeFormatterCommandLineParser()
    const action: CommandLineAction = commandLineParser.getAction('prettier')
    const args: string[] = ['prettier', '"**/*.ts"', '--write']

    return commandLineParser.execute(args).then(() => {
      expect(commandLineParser.selectedAction).toBe(action)

      const copiedArgs: string[] = []
      for (const parameter of action.parameters) {
        copiedArgs.push(`### ${parameter.longName} output: ###`)
        parameter.appendToArgList(copiedArgs)
      }

      copiedArgs.push(`### remainder output: ###`)
      action.remainder!.appendToArgList(copiedArgs)

      expect(copiedArgs).toMatchSnapshot()
    })
  })
})
