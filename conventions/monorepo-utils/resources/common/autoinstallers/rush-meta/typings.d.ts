import { GitHubPullRequest, GitHubUser, GitRepoStateReference } from './github'

export type {
  GitHubPullRequest,
  GitHubTeam,
  GitHubUser,
  GitHubPullRequestLabel,
  GitHubRepo,
  GitRepoStateReference,
} from './github'

export interface RushMetaGitHubPullRequest
  extends Pick<GitHubPullRequest, 'title' | 'body' | 'url' | 'number' | 'draft'> {
  user: Pick<GitHubUser, 'login'>
  head: Pick<GitRepoStateReference, 'label' | 'ref' | 'sha'>
  base: Pick<GitRepoStateReference, 'label' | 'ref' | 'sha'>
}

/**
 * GitHub repository configuration for this pipeline
 * All normalized taken from what Jenkins can provide and what
 * RushJS.io can also give us.
 */
export interface RushMetaGitHubRepo {
  /**
   * The branch to use to make releases on.
   * That is the branch name that Rush will use to push release tags and be used to build and publish to Nexus.
   *
   * @defaultValue 'master'
   */
  defaultBranch: string
  /**
   * Name of the authoritative Git repository
   *
   * @defaultValue 'origin'
   */
  defaultRemote: string
  /**
   * Shortened version of sha (e.g. 'bb8e7ca374')
   */
  latestCommitAbbreviatedSha: string
  /**
   * The current branch
   *
   * What would be env.GITHUB_REPO_BRANCH
   *
   * @defaultValue 'master'
   */
  branch: string
  /**
   * What would be env.GITHUB_REPO_OWNER_PROJECT_SLUG
   */
  ownerProjectSlug: string
  /**
   * What would be env.GITHUB_REPO_PROJECT_SLUG
   */
  projectSlug: string
  /**
   * What would be env.GITHUB_REPO_BRANCH_SLUG
   *
   * An escaped version of branch
   */
  branchSlug: string
  /**
   * What would be env.GITHUB_REPO_URL_WEB
   *
   * Git repository over HTTP
   *
   * ```
   * 'https://github.com/my-org-name/project-name-sandbox'
   * ```
   *
   */
  urlWeb: string
  /**
   * What would be env.GITHUB_REPO_URL
   *
   * Git repository DSN, in the format of a git at sign, not an HTTP URL.
   *
   * ```
   * 'git@github.com:my-org-name/project-name-sandbox.git'
   * ```
   */
  url: string
}
