// There is a Chicken-Egg and egg situation,
// By design, Rush treats what's in "common/autoinstallers" as completely separate packages.
// It was inspired by utilities such as prettier that we want to run as early as possible.
// For the moment, functions with a remark mentioning "common/autoinstallers" will be copy-pasted by hand.
// Either in this file, or in github-api-client.ts, or in github-api-types.ts

/**
 * @internal
 */
export const isGitHubHttpUrl = (url: string): boolean => {
  return url
    .replace(/^https?:\/\//i, '')
    .toLowerCase()
    .startsWith('github.com')
}

/**
 * When making conversion between a dictionary of strings and using them
 * on a Shell execution environment, we typically want CAPITAL words.
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 * @param text - some text in "camelCase" to transform into "CAPITAL_SNAKE_CASE"
 */
export const transformToSnakeCase = (text: string): string =>
  text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toUpperCase())
    .join('_')

/**
 * Take a Git URL and extract owner/project-name
 *
 * @example
 * ```markdown
 * - input:  git@github.com:my-org-name/project-name-sandbox.git
 * - output: my-org-name/project-name-sandbox
 * ```
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const transformGitUrlToOwnerProjectSlug = (githubRepoGitUrl: string): string =>
  githubRepoGitUrl.split(':')[1].replace(/\.git$/, '')

/**
 * Take a Git URL and make it a GitHub Web URL
 *
 * @example
 * ```markdown
 * - input:  git@github.com:my-org-name/project-name-sandbox.git
 * - output: https://github.com/my-org-name/project-name-sandbox
 * ```
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const transformGitUrlToWebUrl = (githubRepoGitUrl: string): string =>
  githubRepoGitUrl
    .replace(':', '/')
    .replace(/^git@/, 'https://')
    .replace(/\.git$/, '')

/**
 * Take a Branch name that might have slashes and special characters,
 * escape it all
 *
 * @example
 * ```markdown
 * - input:  foo-bAaR/baAz-Buz
 * - output: foo-baar-baaz-buz
 * ```
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 */
export const transformGitBranchToEscapedSlug = (githubRepoBranch: string): string =>
  githubRepoBranch.toLowerCase().replace(/[^a-z0-9]/g, '-')
