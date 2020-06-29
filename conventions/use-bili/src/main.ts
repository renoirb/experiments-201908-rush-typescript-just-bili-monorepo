import { Config, ConfigOutput } from 'bili'
import { plugins as initPlugins } from './plugins'
import { input as initInput } from './input'

import bundlingHelpers, {
  BrandingInterface,
  createPackageDependencyChecker,
  DependencyType,
  PackageDependencyChecker,
  packageExtractExternals,
} from '@renoirb/tools-bundling-helpers'
import { resolve } from 'path'

export { BrandingInterface }

export interface IProcessEnvRunTimeOptions {
  hasBiliBundleNodeModulesOption: boolean
  isDevModeVerbose: boolean
}

const createDepChecker = (depChecker: PackageDependencyChecker) => (
  name: string,
  type: DependencyType,
  mustHave: boolean = false,
): boolean => {
  const hasDependency = depChecker(name, type)
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

export const resolveRunTimeOptions = (
  p: NodeJS.Process,
  cfg: Config,
): Readonly<IProcessEnvRunTimeOptions> => {
  const { DEBUG = '', BILI_BUNDLE_NODE_MODULES = '' } = p.env
  const isDevModeVerbose = String(DEBUG).length > 1
  let hasBiliBundleNodeModulesOption = BILI_BUNDLE_NODE_MODULES === 'true'
  if (cfg.bundleNodeModules) {
    hasBiliBundleNodeModulesOption = cfg.bundleNodeModules === true
  }
  const out: IProcessEnvRunTimeOptions = {
    hasBiliBundleNodeModulesOption,
    isDevModeVerbose,
  }

  return Object.freeze(out)
}

/**
 * @public
 */
export const main = (
  cfg: Config,
  branding: Partial<BrandingInterface> = {},
): Config => {
  const runtimeOpts = resolveRunTimeOptions(process, cfg)
  const plugins = initPlugins(process, runtimeOpts)
  const input = initInput(cfg && cfg.input ? cfg.input : 'src/index.js')

  const output: ConfigOutput = {
    sourceMap: true,
    minify: !runtimeOpts.isDevModeVerbose,
    ...(cfg.output || {}),
  }

  const config: Config = {
    banner: true,
    bundleNodeModules: false,
    input,
    plugins,
    ...(cfg || {}),
    output,
  }

  /**
   * If we can get process.cwd, let's leverage bundlingHelpers'
   * ability to read host package.json
   */
  if (process && process.cwd) {
    const bundle = bundlingHelpers(resolve(process.cwd()), branding)

    /**
     * Utility to check for build-time dependency.
     * And to make sure host package has what's needed.
     * In other words, it helps avoid build config mistakes for some easy to forget dependencies.
     */
    const depChecker = createDepChecker(
      createPackageDependencyChecker(bundle.pkg),
    )

    /**
     * Leverage bundlingHelpers' banner utility
     */
    Object.assign(config, { banner: bundle.banners.banner })

    // console.log('4 use-bili bundlingHelpers', {
    //   runtimeOpts,
    // })

    /**
     * Make sure that if we ask to hasBiliBundleNodeModulesOption or
     * bundleNodeModules, that the host package ACTUALLY DOES
     * have its runtime dependency.
     */
    if (runtimeOpts.hasBiliBundleNodeModulesOption === false) {
      // if is false, make sure the host package HAS runtime dependencies
      depChecker('@babel/runtime-corejs3', 'dependencies', true)
    } else {
      /**
       * Add any package.json dependencies, peerDependencies as externals
       */
      const externals =
        'externals' in config && Array.isArray(config.externals)
          ? config.externals
          : []
      Object.assign(config, {
        externals: [...externals, ...packageExtractExternals(bundle.pkg)],
      })

      depChecker('@babel/runtime-corejs3', 'devDependencies', true)
      depChecker('@babel/plugin-transform-runtime', 'devDependencies', true)
      depChecker('@babel/preset-env', 'devDependencies', true)
    }

    // console.log('4 use-bili bundlingHelpers', {
    //   config,
    //   'config.externals': config.externals,
    //   bundle,
    //   runtimeOpts,
    //   'process.env': JSON.parse(JSON.stringify(process.env)),
    // })
  }

  return config
}
