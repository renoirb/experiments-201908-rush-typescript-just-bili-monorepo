import type { IStringBuilderOptions } from './types'

/**
 * Default or fallback values for UrlBuilder
 *
 * @public
 */
export const STRING_BUILDER_DEFAULTS: Readonly<IStringBuilderOptions> = {
  jenkinsBaseUrl: 'https://jenkins.my-org-name.example.org/jenkins',
  nexusBaseUrl: 'https://nexus.my-org-name.example.org',
  nexusNamespace: 'some-nexus-npm-namespace',
  teamName: 'dev-example-team-name',
  projectSlug: 'some-example-monorepo',
  ownerProjectSlug: 'my-org-name/some-example-monorepo',
  repositoryBaseUrl: 'https://github.com',
}

/**
 * Markdown content text delimiter for ReadmeAction can
 * regenerate its contents.
 *
 * Starting marker.
 *
 * @internal
 */
export const GENERATED_PROJECT_SUMMARY_START_COMMENT_TEXT: string =
  '<!-- GENERATED PROJECT SUMMARY START -->'

/**
 * Markdown content text delimiter for ReadmeAction can
 * regenerate its contents.
 *
 * Ending marker.
 *
 * @internal
 */
export const GENERATED_PROJECT_SUMMARY_END_COMMENT_TEXT: string =
  '<!-- GENERATED PROJECT SUMMARY END -->'

/**
 * Color codes we can use on shields.io
 *
 * https://shields.io/
 *
 * @internal
 */
export const SHIELDS_IO_COLORS = [
  'brightgreen',
  'green',
  'yellowgreen',
  'yellow',
  'orange',
  'red',
  'blue',
  'lightgrey',
  'success',
  'important',
  'critical',
  'informational',
  'inactive',
] as const

/**
 * Views that are available on a Jenkins job
 *
 * e.g. "console" at the end of the URL on master build job #162
 *
 * Would look like this; https://jenkins.my-org-name.example.org/jenkins/job/dev-example-team-name/job/project-name-sandbox/job/branches/job/master/162/console
 *
 * @internal
 */
export const JENKINS_JOB_URL_VIEWS = ['console', 'consoleFull', 'consoleText'] as const

/**
 * On a README.md file we have a number of image or link badges.
 * They are meant to link to a build outcome or a generated asset.
 *
 * @public
 */
export const enum ProjectReadmeBadgeType {
  /**
   * To the build output stored on Nexus
   */
  Nexus = 'nexus',
  /**
   * To the Jenkins job
   */
  Jenkins = 'jenkins', // @TODO
  /**
   * To the package’s sub directory inside the monorepo.
   */
  MonorepoPackage = 'monorepo:package', // @TODO
  /**
   * To the package’s sub directory, inside its docs/ folder looking for the README.md index.
   */
  MonorepoPackageDocs = 'monorepo:package:docs', // @TODO
}
