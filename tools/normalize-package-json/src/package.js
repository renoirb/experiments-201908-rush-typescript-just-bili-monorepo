import { resolve } from 'path'
import { copy, existsSync, readJSONSync, writeFile } from 'fs-extra'
import sortPackageJson from 'sort-package-json'
import consola from 'consola'

/**
 * Normalize Package JSON utility.
 *
 * - Read and shape package.json contents,
 * copy package.json fields between packages.
 * - Copy files between packages.
 *
 * Can be extended for a build system.
 */
export class Package {
  constructor(options) {
    const DEFAULTS = {
      autoFix: true,
      rootDir: process.cwd(),
      pkgPath: 'package.json',
      configPath: 'package.js',
      distDir: 'dist',
    }

    // Assign options
    this.options = Object.assign({}, DEFAULTS, options)

    // Basic logger
    this.logger = consola

    // Init (sync)
    this._init()
  }

  _init() {
    // Try to read package.json
    this.readPkg()

    // Use tagged logger
    this.logger = consola.withTag(this.pkg.name)

    // Try to load config
    this.loadConfig()
  }

  copyFieldsFrom(source, fields = []) {
    for (const field of fields) {
      this.pkg[field] = source.pkg[field]
    }
  }

  async copyFilesFrom(source, files) {
    for (const file of files || source.pkg.files || []) {
      const src = resolve(source.options.rootDir, file)
      const dst = resolve(this.options.rootDir, file)
      await copy(src, dst)
    }
  }

  resolvePath(...args) {
    return resolve(this.options.rootDir, ...args)
  }

  readPkg() {
    this.pkg = readJSONSync(this.resolvePath(this.options.pkgPath))
  }

  loadConfig() {
    const configPath = this.resolvePath(this.options.configPath)

    if (existsSync(configPath)) {
      let config = require(configPath)
      config = config.default || config

      Object.assign(this.options, config)
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
    )
  }

  async writePackage() {
    const pkgPath = this.resolvePath(this.options.pkgPath)
    this.logger.debug('Writing', pkgPath)
    const stringified = JSON.stringify(this)
    await writeFile(pkgPath, stringified)
  }

  toJSON() {
    if (this.options.autoFix) {
      this.autoFix()
    }
    return this.pkg
  }

  toString() {
    return JSON.stringify(this.pkg, null, 2) + '\n'
  }

  tryRequire(id) {
    try {
      return require(id)
    } catch (e) {}
  }

  autoFix() {
    this.pkg = sortPackageJson(this.pkg)
  }
}
