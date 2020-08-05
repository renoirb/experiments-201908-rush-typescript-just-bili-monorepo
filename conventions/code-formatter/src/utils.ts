import { FileSystem } from '@rushstack/node-core-library'
import { strict as assert } from 'assert'
import * as path from 'path'

import type { WrappedCommandsType, BasePathPrefixChoices } from './types'

export const wrappedCommands = ['prettier', 'sort-package-json'] as const

export const isSupportedCommand = (
  name: string,
): name is WrappedCommandsType => {
  return wrappedCommands.includes(name as WrappedCommandsType) === true
}

/**
 * Assertion functions to validate if supported command.
 *
 * @param name name of a command to make sure exists
 *
 * TODO: Make sure we can actually use them for type-narrowing in functions. Something is missing. To be figured-out.
 *
 * Bookmarks:
 * - https://github.com/microsoft/TypeScript/issues/36931
 */
export const assertsIsSupportedCommand = (
  name: string,
): asserts name is WrappedCommandsType => {
  const test = isSupportedCommand(name)
  const message = `Unsupported command ${name}`
  // Which one to use, this
  assert(test === true, message)
  if (test) {
    // Or that
    throw new Error(message)
    // or AssertionError from assert built-in module
    // throw new AssertionError({message})
  }
}

export const resolveAndNormalizePath = (
  filePath: string,
  prefixWith: BasePathPrefixChoices = 'relative',
): string => {
  let resolved: string
  switch (prefixWith) {
    case 'from-package':
      resolved = path.resolve(__dirname, filePath)
      break

    case 'from-cwd':
      resolved = path.resolve(process.cwd(), filePath)
      break

    case 'relative':
      resolved = filePath
      break

    default:
      const _exhaustiveSwitchCase: never = prefixWith
      return _exhaustiveSwitchCase
      break
  }

  const normalized = path.normalize(resolved)
  if (!FileSystem.exists(normalized)) {
    const message = `
      File ${filePath} not found as ${normalized}
    `
      .replace(/[\n\s]+/g, ' ')
      .trim()
    throw new Error(message)
  }

  return normalized
}
