/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */
import { RushConfiguration, RushConfigurationProject } from '@microsoft/rush-lib'
import { Git } from '@microsoft/rush-lib/lib/logic/Git'
import { Npm } from '@microsoft/rush-lib/lib/utilities/Npm'
import { Terminal } from '@rushstack/node-core-library'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { RushMetaGitHubPullRequest, GitHubPullRequest } from './github-api-types'
import type { IRushMetaGitHubRepo } from './types'
import {
  transformGitBranchToEscapedSlug,
  transformGitUrlToOwnerProjectSlug,
  transformGitUrlToWebUrl,
  transformToSnakeCase,
} from './utils'

// There is a Chicken-Egg and egg situation,
// By design, Rush treats what's in "common/autoinstallers" as completely separate packages.
// It was inspired by utilities such as prettier that we want to run as early as possible.
// For the moment, functions with a remark mentioning "common/autoinstallers" will be copy-pasted by hand.
// Either in this file, or in utils.ts, or in github-api-types.ts

const REGEXP_GITHUB_GIT_URL_BEGIN = /^git@[a-z0-9\._-]+:/
const REGEXP_GITHUB_GIT_URL_END = /\.git$/

const FALLBACK_DEFAULT_REPO_BRANCH = 'master'
const FALLBACK_DEFAULT_REPO_REMOTE = 'origin'
const FALLBACK_DEFAULT_REPO_URL = 'git@github.com:my-org-name/project-name-sandbox.git'

/**
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const createGitHubApiHttpClient = (GITHUB_TOKEN = ''): AxiosInstance => {
  const headers: Record<string, string> = {}
  if (GITHUB_TOKEN.length > 1) {
    headers.Authorization = `token ${GITHUB_TOKEN}`
  }
  const httpClient = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...headers,
    },
  })
  return httpClient
}

/**
 * Read Shell environment and figure out values for CI.
 *
 * @public
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const createRushMetaContext = (
  env: NodeJS.ProcessEnv,
  rushConfig: RushConfiguration,
  git: Git,
  terminal: Terminal,
): IRushMetaGitHubRepo => {
  const { abbreviatedSha = '', branch = FALLBACK_DEFAULT_REPO_BRANCH } =
    git.getGitInfo() ?? {}
  const GITHUB_REPO_BRANCH = env.GITHUB_REPO_BRANCH || branch

  const {
    repositoryDefaultBranch,
    repositoryDefaultRemote,
    repositoryUrl = FALLBACK_DEFAULT_REPO_URL,
  } = rushConfig

  const GITHUB_REPO_URL = repositoryUrl

  // TODO: This above is incomplete and would need refactor and tests.
  // This file was just copy-pasted and made to work in TypeScript
  // Outcome of this function is not guaranteed!
  terminal.writeVerboseLine(`GITHUB_REPO_URL: ${GITHUB_REPO_URL}`)
  terminal.writeVerboseLine(`GITHUB_REPO_DEFAULT_BRANCH: ${repositoryDefaultBranch}`)
  terminal.writeVerboseLine(`GITHUB_REPO_DEFAULT_REMOTE: ${repositoryDefaultRemote}`)

  if (
    REGEXP_GITHUB_GIT_URL_BEGIN.test(GITHUB_REPO_URL) !== true &&
    REGEXP_GITHUB_GIT_URL_END.test(GITHUB_REPO_URL) !== true
  ) {
    throw new Error(
      `Invalid Git Repository URL "${GITHUB_REPO_URL}" is not a SSH Git URL string similar to; ${FALLBACK_DEFAULT_REPO_URL}`,
    )
  }

  const GITHUB_REPO_BRANCH_SLUG = transformGitBranchToEscapedSlug(GITHUB_REPO_BRANCH)
  const GITHUB_REPO_OWNER_PROJECT_SLUG =
    transformGitUrlToOwnerProjectSlug(GITHUB_REPO_URL)
  const GITHUB_REPO_PROJECT_SLUG = GITHUB_REPO_OWNER_PROJECT_SLUG.split('/')[1]
  const GITHUB_REPO_URL_WEB = transformGitUrlToWebUrl(GITHUB_REPO_URL)

  /**
   * Fill all required CI values based on the logic made above.
   *
   * Rush has its own configuration, and Jenkins provides shell environment values
   * this object should take what's applicable to help us figure out the
   * desired build outcome.
   */
  const rushMeta: IRushMetaGitHubRepo = {
    latestCommitAbbreviatedSha: abbreviatedSha,
    branch: GITHUB_REPO_BRANCH,
    branchSlug: GITHUB_REPO_BRANCH_SLUG,
    defaultBranch: repositoryDefaultBranch,
    defaultRemote: repositoryDefaultRemote,
    ownerProjectSlug: GITHUB_REPO_OWNER_PROJECT_SLUG,
    projectSlug: GITHUB_REPO_PROJECT_SLUG,
    url: GITHUB_REPO_URL,
    urlWeb: GITHUB_REPO_URL_WEB,
  }

  return rushMeta
}

/**
 * PoC: Attempt at fetching things using GitHub API
 *
 * That would be useful to know who made the work, and get PR's data based on a past merged branch
 * we are about to make a release from.
 *
 * Bookmarks:
 * - https://docs.github.com/en/rest/reference/pulls#create-a-pull-request--parameters
 *
 * @public
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const getRepoPullRequests = async (
  gitHubApiClient: AxiosInstance,
  GITHUB_REPO_OWNER_PROJECT_SLUG = '',
): Promise<RushMetaGitHubPullRequest[]> => {
  const PRs = []
  const { data = [] } = (await gitHubApiClient.get(
    `/repos/${GITHUB_REPO_OWNER_PROJECT_SLUG}/pulls`,
  )) as { data: GitHubPullRequest[] }
  for (const pr of data) {
    const {
      url,
      draft,
      // body,
      number,
      title,
      user = { login: '' },
      head = { label: '', ref: '', sha: '' },
      base = { label: '', ref: '', sha: '' },
    } = pr
    const item: RushMetaGitHubPullRequest = {
      // body,
      draft,
      number,
      title,
      url,
      user: { login: user.login },
      head: { label: head.label, ref: head.ref, sha: head.sha },
      base: { label: base.label, ref: base.ref, sha: base.sha },
    }
    // console.log(`PRs: #${number} => ${title}`, JSON.parse(JSON.stringify(item)))
    PRs.push(item)
  }
  return PRs
}

/**
 * PoC: Get published version of a package.
 *
 * That would be useful for knowing if what we want to publish is already released.
 *
 * @public
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const getAllPackagesPublishedVersions = (
  projects: RushConfigurationProject[] = [],
  ROOT_PATH = '',
  env: NodeJS.ProcessEnv,
): Map<string, string[]> => {
  const versions = new Map<string, string[]>()
  for (const pkg of projects) {
    const { packageName = '@project-name/bucket-marshaller' } = pkg
    versions.set(packageName, Npm.publishedVersions(packageName, ROOT_PATH, env))
  }
  return versions
}

/**
 * Read what is in the CI process, write normalized data to a file.
 *
 * @public
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const createRushMetaJsonContents = (
  env: NodeJS.ProcessEnv,
  rushConfig: RushConfiguration,
  git: Git,
  terminal: Terminal,
): Record<string, string> => {
  const rushMeta = createRushMetaContext(env, rushConfig, git, terminal)

  const fileContents: Record<string, string> = {}
  for (const [envKey, envValue] of Object.entries(rushMeta)) {
    let escapedValue = envValue
    if (envValue === null) {
      escapedValue = ''
    }
    if (typeof envValue === 'boolean') {
      escapedValue = String(escapedValue)
    }
    if (typeof envValue === 'number') {
      if (Number.isNaN(+escapedValue) === false) {
        escapedValue = +escapedValue
      }
    }
    if (typeof escapedValue === 'string') {
      // Values here are mostly for debugging, we should indeed namespace names
      // But not pick anything rush.json gitInfo has to give.
      // environment name cannot be RUSH_... they would conflict with rush itself.
      // But the info here might mostly be empty when we are on CI side.
      const formattedKey = 'GITHUB_REPO_' + transformToSnakeCase(envKey)
      fileContents[formattedKey] = escapedValue
    }
  }

  return fileContents
}
