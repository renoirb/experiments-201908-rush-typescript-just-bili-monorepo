import mod from 'module'
import type {
  IDependencyType,
  IPackageDependencyChecker,
  IPackageJson,
} from './types'

/**
 * For a given package.json, check for dependencies
 *
 * Inspired by:
 * - https://github.com/rollup/plugins/blob/auto-install-v2.1.0/packages/auto-install/src/index.ts#L43
 */
export const createPackageJsonDependenciesSet = (
  pkg: IPackageJson,
  type: IDependencyType = 'dependencies',
  withBuiltIn: boolean = false,
): Set<string> => {
  return new Set<string>(
    Object.keys(pkg[type] || {}).concat(withBuiltIn ? mod.builtinModules : []),
  )
}

/**
 * Utility to check for build-time dependency.
 * And to make sure host package has what's needed.
 * In other words, it helps avoid build config mistakes for some easy to forget dependencies.
 */
export const createDependencyChecker = (
  pkg: IPackageJson,
  type: IDependencyType = 'dependencies',
  withBuiltIn: boolean = true,
): IPackageDependencyChecker => {
  const checker = createPackageJsonDependenciesSet(pkg, type, withBuiltIn)
  return (name: string, mustHave: boolean = true): boolean => {
    const hasDependency = checker.has(name)
    if (hasDependency === false && mustHave === true) {
      const message = `
        Caution, make sure you add ${name} in your package.json ${type},
        the recommended version is in this @renoirb/conventions-use-bili's ${type}
      `
        .replace(/[\n\s]+/g, ' ')
        .trim()
      throw new Error(message)
    }

    return hasDependency
  }
}
