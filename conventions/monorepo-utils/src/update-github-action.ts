import { RushConfiguration } from '@microsoft/rush-lib'
import { Git } from '@microsoft/rush-lib/lib/logic/Git'
import { ConsoleTerminalProvider, Terminal, JsonFile } from '@rushstack/node-core-library'
import { CommandLineAction } from '@rushstack/ts-command-line'
import * as path from 'path'

import { createRushMetaJsonContents } from './github-api-client'

/**
 * Make HTTP Calls to GitHub API.
 *
 * Instead of using a full procedural script, this class could be used in common/autoinstallers/rush-meta
 * To do so, one can import this class and use it in their own CommandLine application.
 *
 * @public
 */
export class UpdateGithubAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'rush-update-github',
      summary: 'GitHub API HTTP Client CLI utility.',
      documentation: 'Help keep GitHub repository up to date during releases',
    })
  }

  protected onDefineParameters(): void {
    this.defineFlagParameter({
      parameterLongName: '--verbose',
      parameterShortName: '-v',
      description: 'Show extra logging detail',
    })
  }

  protected async onExecute(): Promise<void> {
    const verboseEnabled = this.getFlagParameter('--verbose').value

    const terminal = new Terminal(new ConsoleTerminalProvider({ verboseEnabled }))
    const rushConfig = RushConfiguration.loadFromDefaultLocation()
    // @ts-ignore - loading error to fix
    const gitClient = new Git(rushConfig)

    const fileContents = createRushMetaJsonContents(
      process.env,
      rushConfig,
      gitClient,
      terminal,
    )

    if (verboseEnabled) {
      console.log('github-repo.json', fileContents)
    }

    const FILE_PATH_RUSH_META_JSON = path.resolve(
      path.join(rushConfig.rushJsonFolder, 'github-repo.json'),
    )

    JsonFile.save(fileContents, FILE_PATH_RUSH_META_JSON, { updateExistingFile: true })
    terminal.writeLine(`File github-repo.json written in ${FILE_PATH_RUSH_META_JSON}`)
  }
}
