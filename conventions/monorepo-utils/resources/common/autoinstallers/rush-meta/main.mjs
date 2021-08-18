// @ts-check

//
// Utility to fetch monorepo meta data.
//
// Bookmarks
// - https://github.com/renoirb/experiments-201908-rush-typescript-just-bili-monorepo/blob/6760bf72/conventions/use-eslint/bin/eslint
//

import { dirname, sep } from 'path'
import * as tsCommandLine from '@rushstack/ts-command-line'

// @ts-ignore
import * as nodeCore from '@rushstack/node-core-library'

// import rushLib from '@microsoft/rush-lib'

// @ts-ignore
import * as rushLibRushConfiguration from '@microsoft/rush-lib/lib/api/RushConfiguration'

// @ts-ignore
import * as rushLibGit from '@microsoft/rush-lib/lib/logic/Git'

// @ts-ignore
import rushLibNpm from '@microsoft/rush-lib/lib/utilities/Npm'

import axios from 'axios'

const { DynamicCommandLineParser, DynamicCommandLineAction } = tsCommandLine
const { FileSystem, JsonFile, Terminal, ConsoleTerminalProvider } = nodeCore
const { RushConfiguration } = rushLibRushConfiguration
const { Git } = rushLibGit
const { Npm } = rushLibNpm

// @ts-ignore — import.meta not typed much yet.
const ROOT_PATH = new URL(dirname(dirname(dirname(dirname(import.meta.url))))).pathname
const FILE_PATH_RUSH_JSON = ROOT_PATH + sep + 'rush.json'
const FILE_PATH_RUSH_META_JSON = ROOT_PATH + sep + 'github-repo.json'

let exists = false
/** @type {import('@microsoft/rush-lib/lib/api/RushConfiguration').RushConfiguration} **/
let rushConfiguration
try {
  exists = FileSystem.exists(FILE_PATH_RUSH_JSON)
  rushConfiguration = RushConfiguration.loadFromConfigurationFile(FILE_PATH_RUSH_JSON)
} catch {
  // Nothing to do, will not execute
}

// There is a Chicken-Egg and egg situation,
// By design, Rush treats what's in "common/autoinstallers" as completely separate packages.
// It was inspired by utilities such as prettier that we want to run as early as possible.
// For the moment, functions with a remark mentioning "project-name/monorepo-utils" will be copy-pasted by hand.

const REGEXP_GITHUB_GIT_URL_BEGIN = /^git@[a-z0-9\._-]+:/
const REGEXP_GITHUB_GIT_URL_END = /\.git$/

const FALLBACK_DEFAULT_REPO_BRANCH = 'master'
const FALLBACK_DEFAULT_REPO_REMOTE = 'origin'
const FALLBACK_DEFAULT_REPO_URL = 'git@github.com:my-org-name/project-name-sandbox.git'

/**
 * @remarks
 * project-name/monorepo-utils: copied in src/utils.ts
 */
const transformToSnakeCase = (text) =>
  text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toUpperCase())
    .join('_')

/**
 * Take a Git URL and extract owner/project-name
 *
 * input:  git@github.com:my-org-name/project-name-sandbox.git
 * output: my-org-name/project-name-sandbox
 *
 * @remarks
 * project-name/monorepo-utils: copied in src/utils.ts
 */
const transformGitUrlToOwnerProjectSlug = (githubRepoGitUrl) =>
  githubRepoGitUrl.split(':')[1].replace(/\.git$/, '')

/**
 * Take a Git URL and make it a GitHub Web URL
 *
 * input:  git@github.com:my-org-name/project-name-sandbox.git
 * output: https://github.com/my-org-name/project-name-sandbox
 *
 * @remarks
 * project-name/monorepo-utils: copied in src/utils.ts
 */
const transformGitUrlToWebUrl = (githubRepoGitUrl) =>
  githubRepoGitUrl
    .replace(':', '/')
    .replace(/^git@/, 'https://')
    .replace(/\.git$/, '')

/**
 * Take a Branch name that might have slashes and special characters,
 * escape it all
 *
 * input:  foo-bAaR/baAz-Buz
 * output: foo-baar-baaz-buz
 *
 * @remarks
 * project-name/monorepo-utils: copied in src/utils.ts
 */
const transformGitBranchToEscapedSlug = (githubRepoBranch) =>
  githubRepoBranch.toLowerCase().replace(/[^a-z0-9]/g, '-')

/**
 * @returns {import('axios').AxiosInstance}
 *
 * @remarks
 * project-name/monorepo-utils: copied in github-api-client.ts
 */
const createGitHubApiHttpClient = (GITHUB_TOKEN = '') => {
  /** @type {Object.<string, string>} */
  const headers = {}
  if (GITHUB_TOKEN.length > 1) {
    headers.Authorization = `token ${GITHUB_TOKEN}`
  }
  /** @type {import('axios').AxiosInstance} */
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
 * PoC: Attempt at fetching things using GitHub API
 *
 * That would be useful to know who made the work, and get PR's data based on a past merged branch
 * we are about to make a release from.
 *
 * Bookmarks:
 * - https://docs.github.com/en/rest/reference/pulls#create-a-pull-request--parameters
 *
 * @remarks
 * project-name/monorepo-utils: copied in github-api-client.ts
 *
 * @returns {Promise<import('./typings').RushMetaGitHubPullRequest[]>}
 */
const getRepoPullRequests = async (
  /** @type {import('axios').AxiosInstance} */
  gitHubApiClient,
  GITHUB_REPO_OWNER_PROJECT_SLUG = '',
) => {
  /** @type {import('./typings').RushMetaGitHubPullRequest[]} */
  const PRs = []
  /** @type {{data: import('./typings').GitHubPullRequest[]}} */
  const { data = [] } = await gitHubApiClient.get(
    `/repos/${GITHUB_REPO_OWNER_PROJECT_SLUG}/pulls`,
  )
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
    /** @type {import('./typings').RushMetaGitHubPullRequest} */
    const item = {
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
 * @remarks
 * project-name/monorepo-utils: copied in github-api-client.ts
 *
 * @returns {Promise<Map.<string, string[]>>}
 */
const getAllPackagesPublishedVersions = async (projects = [], ROOT_PATH = '', env) => {
  const versions = new Map()
  for (const pkg of projects) {
    const { packageName = '@project-name/bucket-marshaller' } = pkg
    const list = await Npm.publishedVersions(packageName, ROOT_PATH, env)
    versions.set(packageName, list)
  }
  return versions
}

const commandLineParser = new DynamicCommandLineParser({
  toolFilename: 'meta',
  toolDescription: 'RushJS Jenkins utility.',
})
commandLineParser.defineFlagParameter({
  parameterLongName: '--verbose',
  parameterShortName: '-v',
  description: 'Show extra logging detail',
})
commandLineParser.defineFlagParameter({
  parameterLongName: '--write-github-repo-json',
  description: 'Write github-repo.json to filesystem',
})
commandLineParser.defineChoiceParameter({
  parameterLongName: '--stage',
  description: 'Which stage are we in',
  alternatives: ['setup', 'publish'],
  defaultValue: 'setup',
})

/**
 *
 * @remarks
 * project-name/monorepo-utils: copied in github-api-client.ts
 *
 * @returns {import('./typings').RushMetaGitHubRepo}
 */
const createRushMetaContext = (
  /** @type {NodeJS.ProcessEnv} **/
  env,
  /** @type {import('@microsoft/rush-lib/lib/api/RushConfiguration').RushConfiguration} **/
  rushConfig,
  /** @type {import('@microsoft/rush-lib/lib/logic/Git').Git} **/
  git,
  /** @type {import('@rushstack/node-core-library').Terminal} **/
  terminal,
) => {
  const gitInfo = git.getGitInfo()
  const GITHUB_REPO_BRANCH = env.GITHUB_REPO_BRANCH || gitInfo.branch

  const { repositoryDefaultBranch, repositoryDefaultRemote, repositoryUrl } = rushConfig

  const GITHUB_REPO_URL = repositoryUrl

  terminal.writeVerboseLine(`GITHUB_REPO_URL: ${GITHUB_REPO_URL}`)

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
   *
   * @type {import('./typings').RushMetaGitHubRepo}
   */
  const rushMeta = {
    latestCommitAbbreviatedSha: gitInfo.abbreviatedSha,
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
 * Read what is in the CI process, write normalized data to a file.
 *
 * @remarks
 * project-name/monorepo-utils: copied in github-api-client.ts as createRushMetaJsonContents
 */
const setup = async (
  /** @type {NodeJS.ProcessEnv} **/
  env,
  /** @type {import('@microsoft/rush-lib/lib/api/RushConfiguration').RushConfiguration} **/
  rushConfig,
  /** @type {import('@microsoft/rush-lib/lib/logic/Git').Git} **/
  git,
  /** @type {import('@rushstack/node-core-library').Terminal} **/
  terminal,
) => {
  const rushMeta = createRushMetaContext(env, rushConfig, git, terminal)

  /** @type {Object.<string, string>} */
  const fileContents = {}
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

  const gitInfo = git.getGitInfo()
  const gitEmail = git.getGitEmail()

  console.log('rush meta --stage setup', {
    gitInfo,
    gitEmail,
    rushMeta,
    fileContents,
  })

  JsonFile.save(fileContents, FILE_PATH_RUSH_META_JSON, { updateExistingFile: true })
}

const publish = async (
  /** @type {NodeJS.ProcessEnv} **/
  env,
  /** @type {import('@microsoft/rush-lib/lib/api/RushConfiguration').RushConfiguration} **/
  rushConfig,
  /** @type {import('@microsoft/rush-lib/lib/logic/Git').Git} **/
  git,
  /** @type {import('@rushstack/node-core-library').Terminal} **/
  terminal,
) => {
  const rushMeta = createRushMetaContext(env, rushConfig, git, terminal)

  const { projects = [], repositoryDefaultBranch } = rushConfig

  let PRs = []
  let versions = new Map()
  const GITHUB_TOKEN = env.GITHUB_TOKEN || ''
  if (GITHUB_TOKEN.length > 1) {
    const gitHubApiClient = createGitHubApiHttpClient(GITHUB_TOKEN)
    PRs = await getRepoPullRequests(
      gitHubApiClient,
      rushMeta.ownerProjectSlug /* env.GITHUB_REPO_OWNER_PROJECT_SLUG */,
    )
    versions = await getAllPackagesPublishedVersions(projects, ROOT_PATH, env)
  }

  // This function is incomplete, and might break still.
  // Intention is to know changed folders from current build and main branch
  // But when there are large amount of files in Git this function breaks.
  // More work will be needed here.
  console.log('rush meta --stage publish -- DEBUGGING --\n', {
    'rushMeta.branch': rushMeta.branch,
    'rushMeta.defaultBranch': rushMeta.defaultBranch,
    // Does rushConfig really provides something for repositoryDefaultBranch
    repositoryDefaultBranch,
  })

  // List changed packages compared to master
  const changedPerPackage = new Map()
  let changed = []
  if (rushMeta.branch !== rushMeta.defaultBranch) {
    // The line below may have a promise deep inside?
    const against = rushMeta.defaultBranch // repositoryDefaultBranch
    // Unclear if RushConfiguration.repositoryDefaultBranch is really what we need or is available.
    changed = await git.getChangedFolders(against, terminal, false)
  }
  for (const pkg of projects) {
    const changes = changed.filter((f) => f.startsWith(pkg.projectRelativeFolder))
    if (changes.length > 0) {
      changedPerPackage.set(pkg.packageName, changes)
    }
  }

  console.log('rush meta --stage publish', {
    PRs,
    versions,
    changed,
    changedPerPackage,
  })
}

export default commandLineParser.execute().then(async () => {
  const verboseEnabled = commandLineParser.getFlagParameter('--verbose').value
  const stage = commandLineParser.getChoiceParameter('--stage').value
  const terminal = new Terminal(new ConsoleTerminalProvider({ verboseEnabled }))
  const gitClient = new Git(rushConfiguration)
  switch (stage) {
    case 'setup':
      await setup(process.env, rushConfiguration, gitClient, terminal)
      break
    case 'publish':
      await publish(process.env, rushConfiguration, gitClient, terminal)
      break
  }
})
