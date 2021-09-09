/* eslint-disable @rushstack/no-new-null, @typescript-eslint/naming-convention */

// There is a Chicken-Egg and egg situation,
// By design, Rush treats what's in "common/autoinstallers" as completely separate packages.
// It was inspired by utilities such as prettier that we want to run as early as possible.
// For the moment, functions with a remark mentioning "common/autoinstallers" will be copy-pasted by hand.
// Either in this file, or in github-api-client.ts, or in utils.ts

/**
 * Value object for "user", or "users", or "owner", or "reviewers" properties.
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 *
 * Bookmarks:
 * - https://docs.github.com/en/rest/reference/pulls#list-pull-requests
 */
export interface GitHubUser {
  readonly type: 'User'
  /**
   * @example
   * "octocat",
   */
  login: string
  /**
   * @example
   * 1,
   */
  id: number
  /**
   * @example
   * "MDQ6VXNlcjE=",
   */
  node_id: string
  /**
   * @example
   * "https://github.com/images/error/octocat_happy.gif",
   */
  avatar_url: string
  /**
   * @example
   * "",
   */
  gravatar_id: string
  /**
   * @example
   * "https://api.github.com/users/octocat",
   */
  url: string
  /**
   * @example
   * "https://github.com/octocat",
   */
  html_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/followers",
   */
  followers_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/following{/other_user}",
   */
  following_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/gists{/gist_id}",
   */
  gists_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/starred{/owner}{/repo}",
   */
  starred_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/subscriptions",
   */
  subscriptions_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/orgs",
   */
  organizations_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/repos",
   */
  repos_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/events{/privacy}",
   */
  events_url: string
  /**
   * @example
   * "https://api.github.com/users/octocat/received_events",
   */
  received_events_url: string
  /**
   * @example
   * false
   */
  site_admin: boolean
}

/**
 * Value object for "team" property.
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 */
export interface GitHubTeam {
  /**
   * @example
   * 1
   */
  id: number
  /**
   * @example
   * "MDQ6VGVhbTE="
   */
  node_id: string
  /**
   * @example
   * "https://api.github.com/teams/1"
   */
  url: string
  /**
   * @example
   * "https://github.com/orgs/github/teams/justice-league"
   */
  html_url: string
  /**
   * @example
   * "Justice League"
   */
  name: string
  /**
   * @example
   * "justice-league"
   */
  slug: string
  /**
   * @example
   * "A great team."
   */
  description: string
  /**
   * @example
   * "closed"
   */
  privacy: string
  /**
   * @example
   * "admin"
   */
  permission: string
  /**
   * @example
   * "https://api.github.com/teams/1/members{/member}"
   */
  members_url: string
  /**
   * @example
   * "https://api.github.com/teams/1/repos"
   */
  repositories_url: string
  /**
   * @example
   * nul
   */
  parent: null | string
}

/**
 * Value object for "labels" property.
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 */
export interface GitHubPullRequestLabel {
  /**
   * @example
   * 208045946
   */
  id: number
  /**
   * @example
   * "MDU6TGFiZWwyMDgwNDU5NDY="
   */
  node_id: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/labels/bug"
   */
  url: string
  /**
   * @example
   * "bug"
   */
  name: string
  /**
   * @example
   * "Something isn't working"
   */
  description: string
  /**
   * @example
   * "f29513"
   */
  color: string
  /**
   * @example
   * true
   */
  default: boolean
}

/**
 * Value object for "repo" property.
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 */
export interface GitHubRepo {
  /**
   * @example
   * 1296269
   */
  id: number
  /**
   * @example
   * "MDEwOlJlcG9zaXRvcnkxMjk2MjY5"
   */
  node_id: string
  /**
   * @example
   * "Hello-World"
   */
  name: string
  /**
   * @example
   * "octocat/Hello-World"
   */
  full_name: string
  /**
   * @example
   * false
   */
  private: boolean
  /**
   * @example
   * "https://github.com/octocat/Hello-World"
   */
  html_url: string
  /**
   * @example
   * "This your first repo!"
   */
  description: string
  /**
   * @example
   * false
   */
  fork: boolean
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World"
   */
  url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}"
   */
  archive_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/assignees{/user}"
   */
  assignees_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}"
   */
  blobs_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/branches{/branch}"
   */
  branches_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}"
   */
  collaborators_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/comments{/number}"
   */
  comments_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/commits{/sha}"
   */
  commits_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}"
   */
  compare_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/contents/{+path}"
   */
  contents_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/contributors"
   */
  contributors_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/deployments"
   */
  deployments_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/downloads"
   */
  downloads_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/events"
   */
  events_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/forks"
   */
  forks_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}"
   */
  git_commits_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}"
   */
  git_refs_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}"
   */
  git_tags_url: string
  /**
   * @example
   * "git:github.com/octocat/Hello-World.git"
   */
  git_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}"
   */
  issue_comment_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}"
   */
  issue_events_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/issues{/number}"
   */
  issues_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}"
   */
  keys_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/labels{/name}"
   */
  labels_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/languages"
   */
  languages_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/merges"
   */
  merges_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/milestones{/number}"
   */
  milestones_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}"
   */
  notifications_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/pulls{/number}"
   */
  pulls_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/releases{/id}"
   */
  releases_url: string
  /**
   * @example
   * "git@github.com:octocat/Hello-World.git"
   */
  ssh_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/stargazers"
   */
  stargazers_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}"
   */
  statuses_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/subscribers"
   */
  subscribers_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/subscription"
   */
  subscription_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/tags"
   */
  tags_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/teams"
   */
  teams_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}"
   */
  trees_url: string
  /**
   * @example
   * "https://github.com/octocat/Hello-World.git"
   */
  clone_url: string
  /**
   * @example
   * "git:git.example.com/octocat/Hello-World"
   */
  mirror_url: string
  /**
   * @example
   * "https://api.github.com/repos/octocat/Hello-World/hooks"
   */
  hooks_url: string
  /**
   * @example
   * "https://svn.github.com/octocat/Hello-World"
   */
  svn_url: string
  /**
   * @example
   * "https://github.com"
   */
  homepage: string
  /**
   * @example
   * null
   */
  language: null | unknown
  /**
   * @example
   * 9
   */
  forks_count: number
  /**
   * @example
   * 80
   */
  stargazers_count: number
  /**
   * @example
   * 80
   */
  watchers_count: number
  /**
   * @example
   * 108
   */
  size: number
  /**
   * @example
   * "master"
   */
  default_branch: string
  /**
   * @example
   * 0
   */
  open_issues_count: number
  /**
   * @example
   * true
   */
  is_template: boolean
  /**
   * @example
   * ["octocat", "atom", "electron", "api"]
   */
  topics: string[]
  /**
   * @example
   * true
   */
  has_issues: boolean
  /**
   * @example
   * true
   */
  has_projects: boolean
  /**
   * @example
   * true
   */
  has_wiki: boolean
  /**
   * @example
   * false
   */
  has_pages: boolean
  /**
   * @example
   * true
   */
  has_downloads: boolean
  /**
   * @example
   * false
   */
  archived: boolean
  /**
   * @example
   * false
   */
  disabled: boolean
  /**
   * @example
   * "public"
   */
  visibility: string
  /**
   * @example
   * "2011-01-26T19:06:43Z"
   */
  pushed_at: string
  /**
   * @example
   * "2011-01-26T19:01:12Z"
   */
  created_at: string
  /**
   * @example
   * "2011-01-26T19:14:43Z"
   */
  updated_at: string
  /**
   * @example
   * true
   */
  allow_rebase_merge: boolean
  /**
   * @example
   * null
   */
  template_repository: null | unknown
  /**
   * @example
   * "ABTLWHOULUVAXGTRYU7OC2876QJ2O"
   */
  temp_clone_token: string
  /**
   * @example
   * true
   */
  allow_squash_merge: boolean
  /**
   * @example
   * false
   */
  allow_auto_merge: boolean
  /**
   * @example
   * true
   */
  delete_branch_on_merge: boolean
  /**
   * @example
   * true
   */
  allow_merge_commit: boolean
  /**
   * @example
   * 42
   */
  subscribers_count: number
  /**
   * @example
   * 0
   */
  network_count: number
  /**
   * @example
   * 1
   */
  forks: number
  /**
   * @example
   * 1
   */
  open_issues: number
  /**
   * @example
   * 1
   */
  watchers: number
  permissions: Record<'admin' | 'push' | 'pull' | string, boolean>
  license: Record<'key' | 'name' | 'url' | 'spdx_id' | 'node_id' | 'html_url', string>
}
/**
 * Value object for "head", "base" property.
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * @public
 */
export interface GitRepoStateReference {
  label: string
  ref: string
  sha: string
  user: GitHubUser
  repo: GitHubRepo
}

/**
 * GitHub Pull Request
 *
 * In GitHub API v3 (not GraphQL, for now!)
 *
 * @remarks
 * copied from common/autoinstallers/rush-meta
 *
 * Bookmarks:
 * - https://docs.github.com/en/rest/reference/pulls#list-pull-requests
 */
export interface GitHubPullRequest {
  /**
   * The PR's title
   */
  title: string
  user: GitHubUser
  /**
   * The PR text, in Markdown
   */
  body?: string
  /**
   * @example
   * 'https://api.github.com/repos/my-org-name/project-name-sandbox/pulls/10',
   */
  url: string
  /**
   * This Pull Request's HEAD
   */
  head: GitRepoStateReference
  /**
   * On which HEAD this Pull Request should be compared against
   */
  base: GitRepoStateReference
  /**
   * @example
   *  714343539,
   */
  id: number
  /**
   * @example
   *  'https://github.com/my-org-name/project-name-sandbox/pull/10',
   */
  html_url: string
  /**
   * @example
   *  'https://github.com/my-org-name/project-name-sandbox/pull/10.diff',
   */
  diff_url: string
  /**
   * @example
   *  'https://github.com/my-org-name/project-name-sandbox/pull/10.patch',
   */
  patch_url: string
  /**
   * @example
   *  10,
   */
  number: number
  /**
   * @example
   *  'open',
   */
  state: string
  /**
   * @example
   *  false,
   */
  locked: boolean
  /**
   * @example
   *  [Object],
   */
  assignee: GitHubUser
  /**
   * @example
   *  [Array],
   */
  assignees: GitHubUser[]
  /**
   * @example
   *  [],
   */
  requested_reviewers: GitHubUser[]
  /**
   * @example
   *  [],
   */
  requested_teams: GitHubTeam[]
  /**
   * @example
   *  [Array],
   */
  labels: GitHubPullRequestLabel[]
  /**
   * @example
   *  false,
   */
  draft: boolean
  /**
   * @example
   *  'https://api.github.com/repos/my-org-name/project-name-sandbox/pulls/10/commits',
   */
  commits_url: string
  /**
   * @example
   *  'https://api.github.com/repos/my-org-name/project-name-sandbox/pulls/10/comments',
   */
  review_comments_url: string
  /**
   * @example
   *  'https://api.github.com/repos/my-org-name/project-name-sandbox/pulls/comments{/number}',
   */
  review_comment_url: string
  /**
   * @example
   *  'https://api.github.com/repos/my-org-name/project-name-sandbox/issues/10/comments',
   */
  comments_url: string
  /**
   * @example
   *  'https://api.github.com/repos/my-org-name/project-name-sandbox/statuses/7fd02af9ebe479aa946ed9add43304dc96b7662e',
   */
  statuses_url: string
  /**
   * OpenAPI href map
   */
  _links: Record<string, Record<'href', string>>
  /**
   * @example
   *  'CONTRIBUTOR',
   */
  author_association: string
  /**
   * @example
   * "too heated"
   */
  active_lock_reason?: string
  /**
   * @example
   * "2011-01-26T19:01:12Z"
   */
  created_at: string
  /**
   * @example
   * "2011-01-26T19:01:12Z"
   */
  updated_at: string
  /**
   * @example
   * "2011-01-26T19:01:12Z"
   */
  closed_at: string
  /**
   * @example
   * "2011-01-26T19:01:12Z"
   */
  merged_at?: string
  /**
   * @example
   * "e5bd3914e2e596debea16f433f57875b5b90bcd6"
   */
  merge_commit_sha?: string
}

/**
 * How we transform GitHub API v3 and pick what we need to walk the PRs.
 *
 * @public
 */
export interface RushMetaGitHubPullRequest
  extends Pick<GitHubPullRequest, 'title' | 'body' | 'url' | 'number' | 'draft'> {
  user: Pick<GitHubUser, 'login'>
  head: Pick<GitRepoStateReference, 'label' | 'ref' | 'sha'>
  base: Pick<GitRepoStateReference, 'label' | 'ref' | 'sha'>
}
