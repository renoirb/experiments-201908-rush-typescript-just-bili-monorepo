import { InternalError } from '@rushstack/node-core-library'
import {
  CommandLineFlagParameter,
  CommandLineParser,
} from '@rushstack/ts-command-line'
import * as os from 'os'

import { PrettierAction } from './prettier-action'
import { SortPackageJsonAction } from './sort-package-json-action'

/**
 * Organize possible and supported options for the command line.
 *
 * In this case, we're mostly telling that prettier or sort-package-json
 * are supported, and rest of arguments are passed in to their respective
 * CLI executable.
 *
 * Bookmarks:
 * - https://github.com/microsoft/rushstack/blob/%40rushstack/ts-command-line_v4.4.6/libraries/ts-command-line/src/test/CommandLineParameter.test.ts
 * - https://github.com/microsoft/rushstack/blob/%40rushstack/ts-command-line_v4.4.6/libraries/ts-command-line/src/test/ActionlessParser.test.ts
 * - https://github.com/microsoft/rushstack/blob/%40rushstack/ts-command-line_v4.4.6/apps/rush-lib/src/cli/RushCommandLineParser.ts
 * - https://github.com/microsoft/rushstack/blob/%40rushstack/ts-command-line_v4.4.6/apps/api-extractor/src/cli/ApiExtractorCommandLine.ts
 */
export class CodeFormatterCommandLineParser extends CommandLineParser {
  private _debugParameter!: CommandLineFlagParameter
  public constructor() {
    super({
      toolFilename: 'code-formatter',
      toolDescription:
        'Code formatting fixer wrapper for prettier and sort-package-json',
    })
    this.addAction(new PrettierAction())
    this.addAction(new SortPackageJsonAction())
  }

  protected onDefineParameters(): void {
    this._debugParameter = this.defineFlagParameter({
      parameterLongName: '--debug',
      parameterShortName: '-d',
      description:
        'Show the full call stack if an error occurs while executing the tool',
    })
  }

  protected onExecute(): Promise<void> {
    if (this._debugParameter.value) {
      InternalError.breakInDebugger = true
    }
    return super.onExecute().catch((error) => {
      if (this._debugParameter.value) {
        console.error(os.EOL + error.stack)
      } else {
        console.error(os.EOL + 'ERROR: ' + error.message.trim())
      }
      process.exitCode = 1
    })
  }
}

export { CommandLineParser }
