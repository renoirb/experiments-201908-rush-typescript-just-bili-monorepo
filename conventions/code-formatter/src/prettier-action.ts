import { FileSystem } from '@rushstack/node-core-library'
import {
  CommandLineAction,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line'
import { strict as assert } from 'assert'
import { execSync } from 'child_process'
import { resolveConfigFile } from 'prettier'

import { resolveAndNormalizePath } from './utils'

/**
 * Prettier wrapper
 *
 * Bookmarks:
 * - https://github.com/microsoft/rushstack/blob/%40rushstack/ts-command-line_v4.4.6/apps/api-extractor/src/cli/InitAction.ts
 */
export class PrettierAction extends CommandLineAction {
  private _configFileParameter!: CommandLineStringParameter

  /**
   * Fully qualified path to this package's provided prettier configuration.
   */
  public readonly CONFIG_FILE_PATH: string

  /**
   * Fully qualified path to this package's prettier binary.
   */
  public readonly BINARY_FILE_PATH: string

  public constructor() {
    super({
      actionName: 'prettier',
      summary: `Runs prettier`,
      documentation: `Use this command to run prettier with shipped re-usable prettier config.`,
    })
    this.CONFIG_FILE_PATH = resolveAndNormalizePath(
      '../prettier.config.js',
      'from-package',
    )
    this.BINARY_FILE_PATH = resolveAndNormalizePath(
      '../node_modules/.bin/prettier',
      'from-package',
    )
  }

  /**
   * Attempt at resolving the syntax fixer configuration file.
   *
   * @param path Path to try loading from
   */
  protected async resolveConfigFile(path: string): Promise<string> {
    // Either give baked-in configuration
    let usablePath: string = this.CONFIG_FILE_PATH
    try {
      // Or attempt with using CLI --config, if found
      const resolved = await resolveConfigFile(path)
      if (resolved !== null) {
        usablePath = resolved
      }
    } catch (_) {
      // Fall back to whatever given
    }
    return usablePath
  }

  protected onDefineParameters(): void {
    /**
     * Related to [@rushstack/ts-command-line][rushstack-1336];
     * How can we merge this value from provided from CLI or
     * serve our own.
     *
     * [rushstack-1336]: https://github.com/microsoft/rushstack/issues/1336
     */
    this._configFileParameter = this.defineStringParameter({
      parameterLongName: '--config',
      parameterShortName: '-c',
      argumentName: 'FILE',
      description: `Use the specified prettier.config.js file path, rather than using shared configuration`,
      defaultValue: this.CONFIG_FILE_PATH,
    })
    this.defineCommandLineRemainder({
      // What about other types such as --flag and --key value thingies?
      // See in onExecute() with this.remainder.values
      description: 'Pass all params to prettier',
    })
  }

  protected execSync(command: string[]): Buffer {
    const fullCommand = command.join(' ')
    console.log(fullCommand)
    const proc: Buffer = execSync(fullCommand, {
      stdio: 'inherit',
    })
    return proc
  }

  protected async onExecute(): Promise<void> {
    const commandShards = [this.BINARY_FILE_PATH]
    const _configFileParameter = this._configFileParameter
    // TODO: Make configFilePath picking from argv
    let configFilePath = _configFileParameter.value
    // Either our own config, or use the provided one.
    // If file not found, fall-back to our own, to be sure, fail if file can't be found.
    if (configFilePath) {
      configFilePath = await this.resolveConfigFile(configFilePath)
      if (!FileSystem.exists(configFilePath)) {
        throw new Error('Config file not found: ' + configFilePath)
      }
    }
    commandShards.push(`--config`)
    assert(
      typeof configFilePath === 'string',
      `Missing configuration file argument`,
    )
    // Type narrowing assertions ^ are kewl, mkaaaay
    commandShards.push(configFilePath)
    // commandShards.push(...argv)
    // _configFileParameter.appendToArgList() // Figure out to pass this, or do this differently
    // This works, though.
    const remainder: string[] = []
    if (this.remainder && this.remainder.values) {
      remainder.push(...this.remainder.values)
    }
    commandShards.push(...remainder)
    // console.log('onExecute 2', { configFilePath, commandShards })
    this.execSync(commandShards)
    return Promise.resolve()
  }
}
