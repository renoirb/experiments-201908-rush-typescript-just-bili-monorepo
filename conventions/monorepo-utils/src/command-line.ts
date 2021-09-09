import { CommandLineParser } from '@rushstack/ts-command-line'

import { RushReadmeAction } from './rush-readme-action'
import { UpdateGithubAction } from './update-github-action'

// Copy-Pasta started off from: https://github.com/microsoft/rushstack/tree/99bec06b/repo-scripts/repo-toolbox/src/ToolboxCommandLine.ts

/**
 * @internal
 */
export class MonorepoUtilsCommandLine extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'monorepo-utils',
      toolDescription: 'Used to execute various operations specific to this repo',
    })

    this.addAction(new RushReadmeAction())
    this.addAction(new UpdateGithubAction())
  }

  protected onDefineParameters(): void {
    // abstract
  }

  protected onExecute(): Promise<void> {
    // override
    return super.onExecute()
  }
}
