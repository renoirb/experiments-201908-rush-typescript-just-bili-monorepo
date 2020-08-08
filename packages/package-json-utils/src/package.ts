import { camelCase, cached } from './utils'
import type { IPackageJson, IDependenciesHashMap } from './types'

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
  dependenciesHashMap: IDependenciesHashMap = {},
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
export const packageExtractExternals = (pkg: IPackageJson): string[] => {
  const { peerDependencies = {}, dependencies = {} } = pkg

  const deps = Object.keys(dependencies)

  const externals = deps
    .concat(Object.keys(peerDependencies).filter((d) => !deps.includes(d)))
    .sort((a, b) => String(a).localeCompare(b))

  return externals
}
