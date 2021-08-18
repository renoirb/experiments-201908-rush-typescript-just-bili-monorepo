/**
 * A library to maintain documentation and references for monorepositories.
 *
 * @remarks
 * While this package has a CLI task to manipulate a README.md file alongside a rush.json git repository
 * most of the library should be used on any NPM/Node.js/JavaScript/TypeScript build pipeline.
 *
 * @packageDocumentation
 */

export type {
  IJenkinsJobUrlViewsSuffix,
  IMarkdownImgBadge,
  IProjectReadmeImgBadge,
  IRushMetaGitHubRepo,
  IShieldsIoColors,
  IStringBuilderOptions,
} from './types'
export { STRING_BUILDER_DEFAULTS, ProjectReadmeBadgeType } from './consts'
export { UrlBuilder } from './url-builder'
export { BaseStringBuilder } from './base-string-builder'
export { RushStringBuilder } from './rush-string-builder'
