import {
  JENKINS_JOB_URL_VIEWS,
  SHIELDS_IO_COLORS,
  ProjectReadmeBadgeType,
} from './consts'

/**
 * String Builder configuration options.
 *
 * So we can get consistent DevOps release documentation links for
 * our projects within a fully automated CI infrastructure.
 *
 * @public
 */
export interface IStringBuilderOptions {
  /**
   * URL Prefix for Jenkins jobs
   */
  jenkinsBaseUrl: string
  /**
   * URL Prefix for Nexus
   */
  nexusBaseUrl: string
  /**
   * Nexus registry namespace.
   * Namespace under which we publish packages.
   */
  nexusNamespace: string
  /**
   * Company's team namespace.
   * The string used when between CI tools
   */
  teamName: string
  /**
   * Source code repository name, an owner or organization (e.g. project-name-sandbox)
   *
   * The last part after the owner (e.g. project-name-sandbox)
   *
   * @see IRushMetaGitHubRepo.projectSlug
   */
  projectSlug: string
  /**
   * Source code repository name prefixed with an owner (or GitHub "organization") namespace, on GitHub it would be "my-org-name"
   *
   * (e.g. my-org-name/project-name-sandbox)
   *
   * @see IRushMetaGitHubRepo.ownerProjectSlug
   */
  ownerProjectSlug: string
  /**
   * Source code repository baseURL
   * Where the source code is hosted.
   *
   * Only the hostname, probably either:
   * - https://github.com, or
   * - https://bitbucket.3amlabs.net (BitBucket)
   */
  repositoryBaseUrl: string
}

/**
 * GitHub repository configuration for this pipeline
 * All normalized taken from what Jenkins can provide and what
 * RushJS.io can also give us.
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 */
export interface IRushMetaGitHubRepo {
  /**
   * The branch to use to make releases on.
   * That is the branch name that Rush will use to push release tags and be used to build and publish to Nexus.
   *
   * @remarks
   * Refer to {@link https://rushjs.io/pages/configs/rush_json/ | rush.json at `repository.defaultBranch` }
   *
   * @defaultValue
   * The default is `master` unless monorepo's rush.json at repository.defaultBranch is set differently.
   */
  defaultBranch: string
  /**
   * Name of the authoritative Git repository
   *
   * @remarks
   * Refer to {@link https://rushjs.io/pages/configs/rush_json/ | rush.json at `repository.defaultRemote` }
   *
   * @defaultValue
   * The default is `origin` unless monorepo's rush.json at repository.defaultRemote is set differently.
   */
  defaultRemote: string
  /**
   * Shortened version of SHA
   *
   * @example
   * ```
   * bb8e7ca374
   * ```
   */
  latestCommitAbbreviatedSha: string
  /**
   * The current branch (unescaped)
   *
   * What would be `env.GITHUB_REPO_BRANCH`
   *
   * @defaultValue
   * master
   */
  branch: string
  /**
   * What would be `env.GITHUB_REPO_OWNER_PROJECT_SLUG`
   *
   * @example
   * ```
   * my-org-name/project-name-sandbox
   * ```
   */
  ownerProjectSlug: string
  /**
   * The last part after the owner (e.g. project-name-sandbox)
   *
   * What would be `env.GITHUB_REPO_PROJECT_SLUG`
   *
   * @example
   * ```
   * project-name-sandbox
   * ```
   */
  projectSlug: string
  /**
   * The branch name, but escaped and lowercased
   *
   * What would be `env.GITHUB_REPO_BRANCH_SLUG`
   *
   * An escaped version of branch
   *
   * @example
   * ```markdown
   * - before: foo-BaAr/baZz
   * - after:  foo-baar-bazz
   * ```
   */
  branchSlug: string
  /**
   * What would be `env.GITHUB_REPO_URL_WEB`
   *
   * Git repository over HTTP
   *
   * @example
   * ```
   * 'https://github.com/my-org-name/project-name-sandbox'
   * ```
   *
   */
  urlWeb: string
  /**
   * What would be `env.GITHUB_REPO_URL`
   *
   * Git repository DSN, in the format of a git at sign, not an HTTP URL.
   *
   * @remarks
   * Refer to {@link https://rushjs.io/pages/configs/rush_json/ | rush.json at `repository.url` }
   *
   * @example
   * ```
   * 'git@github.com:my-org-name/project-name-sandbox.git'
   * ```
   */
  url: string
}

/**
 * @public
 * @see SHIELDS_IO_COLORS
 */
export type IShieldsIoColors = typeof SHIELDS_IO_COLORS[number]

/**
 * @public
 * @see JENKINS_JOB_URL_VIEWS
 */
export type IJenkinsJobUrlViewsSuffix = typeof JENKINS_JOB_URL_VIEWS[number]

/**
 * Markdown image badge with optional link
 *
 * @remarks
 * See {@link https://shields.io/ | Shields.io docs }
 *
 * @example
 * ```markdown
 * ## Image only, no alt
 * ![](https://placekitten.com/g/100/30)
 *
 * ## Image only, with alt
 * ![Cute kitten](https://placekitten.com/g/100/30)
 *
 * ## Image and href, with alt
 * [![Cute kitten](https://placekitten.com/g/100/30)](https://example.org/cute-kitten-article-link)
 * ```
 *
 * @public
 */
export interface IMarkdownImgBadge {
  /**
   * Alternate Text to use for the image tag
   */
  alt?: string
  /**
   * URL to link to (optional)
   *
   * If no URL is provided, the image will not surround a Markdown link around the image.
   */
  href?: string
  /**
   * Main text on the image label, shown typically on the left side of the pellet.
   *
   * For example, link `https://shields.io/badge/label%20on%20left-on%20the%20right-blue` ({@link https://shields.io/badge/label%20on%20left-on%20the%20right-blue | shield image link }), we can see "label on the left" as the label of the pellet
   *
   * @example
   * ```markdown
   * ![](https://shields.io/badge/label%20on%20left-on%20the%20right-blue)
   * ```
   */
  label: string
  /**
   * What is on the right side of the label.
   *
   * For example, link `https://shields.io/badge/label%20on%20left-on%20the%20right-blue` ({@link https://shields.io/badge/label%20on%20left-on%20the%20right-blue | shield image link }), we can see "on the right" as the right side of the pellet
   *
   * @example
   * ```markdown
   * ![](https://shields.io/badge/label%20on%20left-on%20the%20right-blue)
   * ```
   */
  right: string
}

/**
 * {@inheritDoc IMarkdownImgBadge}
 * @public
 */
export interface IProjectReadmeImgBadge extends IMarkdownImgBadge {
  /**
   * What type of badge to use
   *
   * {@link (ProjectReadmeBadgeType:enum)} enum
   */
  type: ProjectReadmeBadgeType
}
