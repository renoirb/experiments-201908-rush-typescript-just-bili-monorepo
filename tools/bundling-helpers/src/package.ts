import {
  IPackageJson,
  PackageJsonLookup,
  INodePackageJson,
} from '@rushstack/node-core-library'
import { camelCase } from './manipulation'
import { PeopleField } from './people-field'
import { BannerFooter, BannerInfo } from './banner'
import { cached } from './utils'

export type { IPackageJson, INodePackageJson }

export interface PackageIdentityInterface {
  banners: BannerFooter
  info: BannerInfo
  pkg: IPackageJson
  projectPath: string
}

export interface PackageJson extends IPackageJson {
  author?: string | PeopleField
}

export interface DependenciesHashMap {
  [name: string]: string
}

/**
 * Strip off @ sign in package name (e.g. "@renoirb/foo-bar" => "renoirb-foo-bar")
 */
export const packageNameToModuleName = cached((name: string): string =>
  camelCase(name.replace(/@/g, '').replace('/', '-')),
)

/**
 * Get a package version as string, without the semver constraint notation.
 *
 * @param {string} packageName The package.json package name to pick version string for
 * @param {Object.<string, string>=} dependenciesHashMap package.json’s dependencies hash map
 *
 * @returns {String|false} If core-js exists in the versions, the version number will be returned, otherwise null
 */
export const packageExtractVersion = (
  packageName: string,
  dependenciesHashMap: DependenciesHashMap = {},
): string | false => {
  let version: string | false = false
  if (typeof packageName === 'string') {
    const dependenciesKeys: string[] = dependenciesHashMap
      ? Object.keys(dependenciesHashMap)
      : []
    if (packageName in dependenciesKeys) {
      const versionString = dependenciesHashMap[packageName]
      version = versionString.replace(/[^\d.]/g, '')
    }
  }

  return version
}

/**
 * Prevent transpiling what is in dependencies and peerDependencies
 */
export const packageExtractExternals = (
  pkg: INodePackageJson | IPackageJson,
): string[] => {
  const { peerDependencies = {}, dependencies = {} } = pkg

  const deps = Object.keys(dependencies)

  const externals = deps
    .concat(Object.keys(peerDependencies).filter((d) => !deps.includes(d)))
    .sort((a, b) => String(a).localeCompare(b))

  return externals
}

export type DependencyType =
  | 'optionalDependencies'
  | 'peerDependencies'
  | 'devDependencies'
  | 'dependencies'

/**
 * Package Dependency Checker
 *
 * From a package, check if a package is declared in a given dependency HashMap.
 */
export type PackageDependencyChecker = (
  name: string,
  type: DependencyType,
) => boolean

export const createPackageDependencyChecker = (
  pkg: INodePackageJson | IPackageJson,
): PackageDependencyChecker => (
  name: string,
  type: DependencyType = 'dependencies',
): boolean => {
  return type in pkg && Object.getOwnPropertyNames(pkg[type]).includes(name)
}

export const tryLoadPackageJsonFor = (
  rootDir: string,
): PackageJson | undefined => {
  const reader: PackageJsonLookup = new PackageJsonLookup()
  const pkg: PackageJson | undefined = reader.tryLoadPackageJsonFor(rootDir)

  return pkg
}
