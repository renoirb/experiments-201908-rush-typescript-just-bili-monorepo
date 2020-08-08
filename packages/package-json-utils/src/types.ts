/**
 * What is the type of dependency in package.json
 *
 * @public
 */
export type IDependencyType =
  | 'optionalDependencies'
  | 'peerDependencies'
  | 'devDependencies'
  | 'dependencies'

/**
 * Each key is a dependency name, and the second is a version constraint
 * or some reference (e.g. pnpm workspace, rush workspace:*, file:///, etc.)
 */
export type IDependenciesHashMap = Record<string, string>

/**
 * Package.json minimum fields
 */
export interface IPackageJson
  extends Partial<Record<IDependencyType, IDependenciesHashMap>> {
  author?: string | IPeopleField
  license?: string
  version: string
  name: string
}

/**
 * Package Dependency Checker
 *
 * From a package, check if a package is declared in a given dependency HashMap.
 *
 * @public
 */
export type IPackageDependencyChecker = (
  name: string,
  mustHave: boolean,
) => boolean

/**
 * IPackageJson
 * https://docs.npmjs.com/files/package.json#people-fields-author-contributors
 */
export interface IPeopleField {
  name?: string
  email?: string
  url?: string
}

export interface IBrandingInterface {
  author: IPeopleField
  authors?: IPeopleField[]
  firstYear?: number
  vendor?: string
}

export interface IBannerInfo {
  /** Project Author as a string */
  author: string
  /** Project name */
  name: string
  /** Package version */
  version: string
  /**
   * License name
   *
   * MUST BE [SPDX format][spdx].
   * Notice that LicenseRef-LICENSE make it possible to tell anything
   * non standard to be included.
   * Which will be where we'll tell it's All Rights Reserved ACME Corp.
   *
   * ```
   * LicenseRef-LICENSE
   * ```
   *
   * [spdx]: https://spdx.org/licenses/
   */
  license: string
  /** Vendor name, non standard to package.json schema, e.g. ACME Corp. */
  vendor: string
  /**
   * Vendor name
   *
   * Non standard to package.json schema
   *
   * ```
   * Copyright (c) ACME Corp. 2015-2019
   * ```
   */
  copyright: string
}

/**
 * Source code banner preformatted
 */
export interface IBannerFooter {
  readonly banner: string | ''
  readonly footer: string | ''
}
