import { CommandLineAction } from '@rushstack/ts-command-line'
import { execSync } from 'child_process'

import { resolveAndNormalizePath } from './utils'

export class SortPackageJsonAction extends CommandLineAction {
  /**
   * Fully qualified path to this package's sort-package-json.
   */
  public readonly BINARY_FILE_PATH: string

  public constructor() {
    super({
      actionName: 'sort-package-json',
      summary: `Runs sort-package-json`,
      documentation: `Use this command to run sort-package-json`,
    })
    this.BINARY_FILE_PATH = resolveAndNormalizePath(
      '../node_modules/.bin/sort-package-json',
      'from-package',
    )
  }

  protected onDefineParameters(): void {
    this.defineCommandLineRemainder({
      description: 'Pass all params to sort-package-json',
    })
  }

  protected execSync(command: string[]): Buffer {
    const fullCommand = command.join(' ')
    const proc: Buffer = execSync(fullCommand, {
      stdio: 'inherit',
    })
    return proc
  }

  protected onExecute(): Promise<void> {
    const commandShards = [this.BINARY_FILE_PATH, 'package.json']
    this.execSync(commandShards)
    return Promise.resolve()
  }
}
