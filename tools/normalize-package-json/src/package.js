import { resolve } from 'path';
import { existsSync, readJSONSync, writeFile } from 'fs-extra';
import sortPackageJson from 'sort-package-json';
import consola from 'consola';
import _ from 'lodash';

const DEFAULTS = {
  sortDependencies: false,
  rootDir: process.cwd(),
  pkgPath: 'package.json',
  configPath: 'package.js',
  distDir: 'dist',
  build: false,
  suffix: process.env.PACKAGE_SUFFIX ? `-${process.env.PACKAGE_SUFFIX}` : '',
  hooks: {},
};

const sortObjectKeys = obj =>
  _(obj)
    .toPairs()
    .sortBy(0)
    .fromPairs()
    .value();

export class Package {
  constructor(options) {
    const rootDir = process.cwd.call(null);
    if (rootDir !== DEFAULTS.rootDir) {
      // Testing? Plz.
      DEFAULTS.rootDir = rootDir;
    }

    // Assign options
    this.options = Object.assign({}, DEFAULTS, options);

    // Basic logger
    this.logger = consola;

    // Init (sync)
    this._init();
  }

  _init() {
    // Try to read package.json
    this.readPkg();

    // Use tagged logger
    this.logger = consola.withTag(this.pkg.name);

    // Try to load config
    this.loadConfig();
  }

  resolvePath(...args) {
    return resolve(this.options.rootDir, ...args);
  }

  readPkg() {
    this.pkg = readJSONSync(this.resolvePath(this.options.pkgPath));
  }

  loadConfig() {
    const configPath = this.resolvePath(this.options.configPath);

    if (existsSync(configPath)) {
      let config = require(configPath);
      config = config.default || config;

      Object.assign(this.options, config);
    }
  }

  async callHook(name, ...args) {
    let fns = this.options.hooks[name];

    if (!fns) {
      return;
    }

    if (!Array.isArray(fns)) {
      fns = [fns];
    }

    for (const fn of fns) {
      await fn(this, ...args);
    }
  }

  load(relativePath, opts) {
    return new Package(
      Object.assign(
        {
          rootDir: this.resolvePath(relativePath),
        },
        opts,
      ),
    );
  }

  async writePackage() {
    if (this.options.sortDependencies) {
      this.sortDependencies();
    }
    const pkgPath = this.resolvePath(this.options.pkgPath);
    this.logger.debug('Writing', pkgPath);
    await writeFile(pkgPath, this.toString());
  }

  toString() {
    return JSON.stringify(this.pkg, null, 2) + '\n';
  }

  tryRequire(id) {
    try {
      return require(id);
    } catch (e) {}
  }

  syncLinkedDependencies() {
    // Apply suffix to all linkedDependencies
    for (const _name of this.options.linkedDependencies || []) {
      const name = _name + (this.options.suffix || '');

      // Try to read pkg
      const pkg =
        this.tryRequire(`${name}/package.json`) ||
        this.tryRequire(`${_name}/package.json`);

      // Skip if pkg or dependency not found
      if (!pkg || !this.pkg.dependencies || !this.pkg.dependencies[name]) {
        continue;
      }

      // Current version
      const currentVersion = this.pkg.dependencies[name];
      const caret = currentVersion[0] === '^';

      // Sync version
      this.pkg.dependencies[name] = caret ? `^${pkg.version}` : pkg.version;
    }
  }

  autoFix() {
    this.pkg = sortPackageJson(this.pkg);
    this.sortDependencies();
  }

  sortDependencies() {
    if (this.pkg.dependencies) {
      this.pkg.dependencies = sortObjectKeys(this.pkg.dependencies);
    }

    if (this.pkg.devDependencies) {
      this.pkg.devDependencies = sortObjectKeys(this.pkg.devDependencies);
    }
  }
}
