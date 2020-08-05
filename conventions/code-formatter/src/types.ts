import { wrappedCommands } from './utils'

import type { Options, RequiredOptions } from 'prettier'
export type BasePathPrefixChoices = 'from-package' | 'from-cwd' | 'relative'

export type WrappedCommandsType = typeof wrappedCommands[number]

export interface INormalizedCliArguments {
  readonly commandName: WrappedCommandsType
  /**
   * Rest of CLI arguments/flags etc. to pass to wrapped command.
   */
  argv: ReadonlyArray<string>
}

export type { Options, RequiredOptions }
