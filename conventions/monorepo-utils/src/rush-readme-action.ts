import { RushConfiguration, RushConfigurationProject } from '@microsoft/rush-lib'
import {
  ConsoleTerminalProvider,
  FileSystem,
  Sort,
  StringBuilder,
  Terminal,
} from '@rushstack/node-core-library'
import { CommandLineAction } from '@rushstack/ts-command-line'
import * as path from 'path'

import {
  GENERATED_PROJECT_SUMMARY_END_COMMENT_TEXT,
  GENERATED_PROJECT_SUMMARY_START_COMMENT_TEXT,
  ProjectReadmeBadgeType,
} from './consts'
import { RushStringBuilder } from './rush-string-builder'

// Copy-Pasta started off from: https://github.com/microsoft/rushstack/tree/99bec06b/repo-scripts/repo-toolbox/src/ReadmeAction.ts

/**
 * From a RushJS.io monorepo, rewrite a block of Markdown contents.
 *
 * This will look up for a rush.json file, and attempt modifiying a sibling README.md file
 *
 * @internal
 */
export class RushReadmeAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'rush-readme',
      summary: 'Generates README.md project table based on rush.json inventory',
      documentation: "Use this to update the repo's README.md",
    })
  }

  private static _isPublished(project: RushConfigurationProject): boolean {
    return project.shouldPublish || !!project.versionPolicyName
  }

  protected async onExecute(): Promise<void> {
    const rushStringBuilder = new RushStringBuilder({})

    const terminal: Terminal = new Terminal(
      new ConsoleTerminalProvider({ verboseEnabled: true }),
    )

    const rushConfiguration: RushConfiguration =
      RushConfiguration.loadFromDefaultLocation()

    const repoReadmePath: string = path.resolve(
      rushConfiguration.rushJsonFolder,
      'README.md',
    )
    const existingReadme: string = await FileSystem.readFileAsync(repoReadmePath)
    const generatedProjectSummaryStartIndex: number = existingReadme.indexOf(
      GENERATED_PROJECT_SUMMARY_START_COMMENT_TEXT,
    )
    const generatedProjectSummaryEndIndex: number = existingReadme.indexOf(
      GENERATED_PROJECT_SUMMARY_END_COMMENT_TEXT,
    )

    if (
      generatedProjectSummaryStartIndex === -1 ||
      generatedProjectSummaryEndIndex === -1
    ) {
      throw new Error(
        `Unable to find "${GENERATED_PROJECT_SUMMARY_START_COMMENT_TEXT}" or ` +
          `"${GENERATED_PROJECT_SUMMARY_END_COMMENT_TEXT}" comment in "${repoReadmePath}"`,
      )
    }

    const readmePrefix: string = existingReadme.substr(
      0,
      generatedProjectSummaryStartIndex +
        GENERATED_PROJECT_SUMMARY_START_COMMENT_TEXT.length,
    )

    const readmePostfix: string = existingReadme.substr(generatedProjectSummaryEndIndex)

    const builder: StringBuilder = new StringBuilder()
    const orderedProjects: RushConfigurationProject[] = [...rushConfiguration.projects]
    Sort.sortBy(orderedProjects, (x) => x.projectRelativeFolder)

    builder.append(readmePrefix)
    builder.append('\n')
    builder.append('\n')
    builder.append('### Published Packages\n\n')
    builder.append(
      '<!-- the table below was generated using @project-name/monorepo-utils rush-readme command -->\n\n',
    )

    builder.append('| Package | Version | Folder | Description |\n')
    builder.append('| ------- | ------- | ------ | ----------- |\n')
    for (const project of orderedProjects.filter((x) =>
      RushReadmeAction._isPublished(x),
    )) {
      terminal.writeLine(
        `Package ${project.packageName} is at ${project.packageJsonEditor.version}`,
      )

      const description = (project.packageJson.description || '').replace(/[\n\r|]+/g, '')
      const folderPath = project.projectRelativeFolder // "apps/api-extractor"

      // | **@project-name/bucket-marshaller**
      builder.append(`| **${project.packageName}** `)
      const nexusBadge = rushStringBuilder.createBadge(
        ProjectReadmeBadgeType.Nexus,
        project,
      )
      // | [ Nexus | 0.1.3 ](https://link.to.nexus/)
      //     ^-- as an image
      builder.append(`| ${nexusBadge} `)
      // | [packages/bucket-marshaller](./packages/bucket-marshaller)
      builder.append(`| [${folderPath}](./${folderPath}) `)
      builder.append(`| ${description} `)
      builder.append(`|\n`)
    }

    builder.append('\n\n### Unpublished Local Projects\n\n')
    builder.append(
      '<!-- the table below was generated using @project-name/monorepo-utils rush-readme command -->\n\n',
    )
    builder.append('| Package | Version | Folder | Description |\n')
    builder.append('| ------- | ------- | ------ | ----------- |\n')
    for (const project of orderedProjects.filter(
      (x) => !RushReadmeAction._isPublished(x),
    )) {
      const description = (project.packageJson.description || '').replace(/[\n\r|]+/g, '')
      const folderPath = project.projectRelativeFolder // "apps/api-extractor"
      const version = project.packageJsonEditor.version // "apps/api-extractor"

      // | **@project-name/bucket-marshaller**
      builder.append(`| **${project.packageName}** `)
      // | 0.1.3
      builder.append(`| ${version} `)
      // | [apps/api-extractor](./apps/api-extractor/)
      builder.append(`| [${folderPath}](./${folderPath}/) `)
      builder.append(`| ${description} `)
      builder.append(`|\n`)
    }

    builder.append(readmePostfix)

    terminal.writeLine(`Writing ${repoReadmePath}`)
    FileSystem.writeFile(repoReadmePath, builder.toString())

    terminal.writeLine('Success.')
  }

  protected onDefineParameters(): void {
    // abstract
  }
}
