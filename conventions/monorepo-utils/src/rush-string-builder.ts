import { RushConfigurationProject } from '@microsoft/rush-lib'

import { ProjectReadmeBadgeType } from './consts'
import type { IShieldsIoColors, IMarkdownImgBadge } from './types'
import { UrlBuilder } from './url-builder'
import { isGitHubHttpUrl } from './utils'

/**
 * From a RushJS project, format a string for making a reference in Markdown format.
 *
 * @public
 */
export class RushStringBuilder extends UrlBuilder {
  /**
   * Git/SSH URL to the GitHub repository.
   */
  get gitHubSshUrl(): string {
    const ctx = this.context
    if (!isGitHubHttpUrl(ctx.repositoryBaseUrl)) {
      const message = `Not applicable, this project’s repositoryBaseUrl ("${ctx.repositoryBaseUrl}") is not on GitHub.com`
      throw new Error(message)
    }
    const outcome = `git@github.com:${ctx.ownerProjectSlug}.git`
    return outcome
  }

  /**
   * Web URL to the GitHub repository.
   */
  get gitHubWebBaseUrl(): string {
    const ctx = this.context
    if (!isGitHubHttpUrl(ctx.repositoryBaseUrl)) {
      const message = `Not applicable, this project’s repositoryBaseUrl ("${ctx.repositoryBaseUrl}") is not on GitHub.com`
      throw new Error(message)
    }
    const outcome = `${ctx.repositoryBaseUrl}/${ctx.ownerProjectSlug}`
    return outcome
  }

  /**
   * Pre-configured badge for an monorepo package (project).
   */
  createBadge(type: ProjectReadmeBadgeType, project: RushConfigurationProject): string {
    // @TODO project parameter is in 2nd position, because this method will soon support also making links to monorepo globally
    let label = ''
    let right = ''
    let href: string | undefined
    let alt: string | undefined
    let color: IShieldsIoColors = 'brightgreen'
    let imgSrc: string | undefined
    switch (type) {
      default:
      case ProjectReadmeBadgeType.Nexus:
        label = 'Nexus'
        right = project.packageJsonEditor.version
        color = 'brightgreen'
        href = this.createUrlToNpmRegistryPackageForVersion(project)
        imgSrc = this.createUrlShieldIo(label, right, color)
        break
    }
    const attrs: IMarkdownImgBadge = {
      label: encodeURIComponent(label),
      right: encodeURIComponent(right),
      href,
      alt: alt ? encodeURIComponent(alt) : undefined,
    }
    const outcome = this.createMarkdownBadge(attrs, imgSrc)
    return outcome
  }

  /**
   * URL to a GitHub hosted project in a folder at the Git tag of that release.
   *
   * @example
   * ```
   * https://github.com/my-org-name/project-name-sandbox/tree/%40project-name%2Fbucket-marshaller_v0.1.3/packages/bucket-marshaller
   * ```
   */
  createUrlToGitHubOnPackageAtVersion(project: RushConfigurationProject): string {
    const path = project.projectRelativeFolder
    const outcome = `${this.gitHubWebBaseUrl}/tree/${encodeURIComponent(
      this.createVersionTag(project),
    )}/${path}`
    return outcome
  }

  /**
   * Fully qualified URL to the Nexus package for that release.
   *
   * @example
   * ```
   * https://nexus.my-org-name.example.com/repository/some-nexus-npm-namespace/%40project-name%2Fbucket-marshaller/-/bucket-marshaller-0.1.3.tgz
   * ```
   */
  createUrlToNpmRegistryPackageForVersion(project: RushConfigurationProject): string {
    const { packageName = '', unscopedTempProjectName = '', packageJsonEditor } = project
    // RushConfiguration ^ should already validate this
    const ctx = this.context
    const outcome = `${ctx.nexusBaseUrl}/${encodeURIComponent(
      packageName,
    )}/-/${unscopedTempProjectName}-${packageJsonEditor.version}.tgz`
    return outcome
  }

  /**
   * Fully qualified URL to the GitHub release tag.
   *
   * @example
   * ```
   * https://github.com/my-org-name/project-name-sandbox/releases/tag/%40project-name%2Fbucket-marshaller_v0.1.3
   * ```
   */
  createGitHubWebTagUrl(project: RushConfigurationProject): string {
    const outcome = `${this.gitHubWebBaseUrl}releases/tag/${encodeURIComponent(
      this.createVersionTag(project),
    )}`
    return outcome
  }

  /**
   * From a RushJS project, format a Git tag matching a release.
   */
  createVersionTag(project: RushConfigurationProject): string {
    const { packageName, packageJsonEditor } = project
    // RushConfiguration ^ should already validate this
    // @project-name/bucket-marshaller_v0.1.3
    const outcome = `${packageName}_v${packageJsonEditor.version}`
    return outcome
  }
}
