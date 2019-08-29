import { IPackageJson, PackageJsonLookup } from '@microsoft/node-core-library';
import { camelCase } from './manipulation';
import { PeopleField } from './people-field';
import { cached } from './utils';

export interface PackageJson extends IPackageJson {
  author?: string | PeopleField;
}

export interface DependenciesHashMap {
  [name: string]: string;
}

export const packageNameToModuleName = cached((name: string): string =>
  camelCase(name.replace(/@/g, '').replace('/', '-')),
);

/**
 * Get a package version as string, without the semver constraint notation.
 *
 * @param {string} packageName The package.json package name to pick version string for
 * @param {Object.<string, string>=} dependenciesHashMap package.json’s dependencies hash map
 *
 * @returns {String|null} If core-js exists in the versions, the version number will be returned, otherwise null
 */
export const packageExtractVersion = (
  packageName: string,
  dependenciesHashMap: DependenciesHashMap = {},
): string | null => {
  let version = null;
  if (typeof packageName === 'string') {
    const dependenciesKeys: string[] = dependenciesHashMap
      ? Object.keys(dependenciesHashMap)
      : [];
    if (packageName in dependenciesKeys) {
      const versionString = dependenciesHashMap[packageName];
      version = versionString.replace(/[^\d.]/g, '');
    }
  }

  return version;
};

/**
 * Prevent transpiling what is in dependencies and peerDependencies
 */
export const packageExtractExternals = (pkg: IPackageJson): string[] => {
  const { peerDependencies = {}, dependencies = {} } = pkg;

  const deps = Object.keys(dependencies);

  const externals = deps
    .concat(Object.keys(peerDependencies).filter(d => !deps.includes(d)))
    .sort((a, b) => String(a).localeCompare(b));

  return externals;
};

export const tryLoadPackageJsonFor = (
  rootDir: string,
): PackageJson | undefined => {
  const reader: PackageJsonLookup = new PackageJsonLookup();
  const pkg: PackageJson | undefined = reader.tryLoadPackageJsonFor(rootDir);

  return pkg;
};
