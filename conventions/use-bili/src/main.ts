import { Config, ConfigOutput } from 'bili'
import { resolve } from 'path'
import { PackageJsonLookup } from '@rushstack/node-core-library'

import initInput from './input'
import initPlugins from './plugins'
import initExtendRollupConfig from './extend-rollup-config'
import resolveRunTimeOptions from './runtime'

import type { IExternals, IBundlingOptions } from './types'

import {
  IBrandingInterface,
  packageExtractExternals,
  createDependencyChecker,
  createBannerFooter,
} from '@renoirb/package-json-utils'

/**
 * Wrapper around Rollup and Bili and WebPack
 *
 * @public
 */
export const useBili = (
  cfg: Config,
  branding: Partial<IBrandingInterface> = {},
  bundlingOptions: Partial<IBundlingOptions> = {},
): Config => {
  const runtimeOpts = resolveRunTimeOptions(process, cfg)
  const rootDir = resolve(process.cwd())
  const ownPackageJson = PackageJsonLookup.loadOwnPackageJson(rootDir)

  const bannerFooter = createBannerFooter(ownPackageJson, branding)

  /**
   * Utility to check for build-time dependency.
   * And to make sure host package has what's needed.
   * In other words, it helps avoid build config mistakes for some easy to forget dependencies.
   */
  const devDepsChecker = createDependencyChecker(
    ownPackageJson,
    'devDependencies',
  )
  const depsChecker = createDependencyChecker(ownPackageJson, 'dependencies')

  const input = initInput(cfg && cfg.input ? cfg.input : 'src/index.js')

  const plugins = initPlugins(runtimeOpts)

  if ('index' in input && runtimeOpts.isDevModeVerbose) {
    // https://babeljs.io/docs/en/configuration
    process.env.BABEL_SHOW_CONFIG_FOR = `./${input.index}`
  }

  const output: ConfigOutput = {
    sourceMap: true,
    minify: !runtimeOpts.isDevModeVerbose,
    ...(cfg.output || {}),
  }

  const config: Config = {
    banner: bannerFooter.banner,
    bundleNodeModules: false,
    ...(cfg || {}),
    input,
    output,
    plugins: {
      ...plugins,
      ...(cfg.plugins || {}),
    },
  }

  /**
   * Make sure that if we ask to hasBiliBundleNodeModulesOption or
   * bundleNodeModules, that the host package ACTUALLY DOES
   * have its runtime dependency.
   */
  if (runtimeOpts.hasBiliBundleNodeModulesOption === false) {
    // if is false, make sure the host package HAS runtime dependencies
    if (bundlingOptions.withCore === true) {
      depsChecker('@babel/runtime-corejs3', true)
    }
  } else {
    /**
     * Add any package.json dependencies, peerDependencies as externals
     */
    const externals = ('externals' in config && Array.isArray(config.externals)
      ? config.externals
      : []) as IExternals[]
    Object.assign(config, {
      externals: [...externals, ...packageExtractExternals(ownPackageJson)],
    })

    if (bundlingOptions.withCore === true) {
      devDepsChecker('@babel/runtime-corejs3', true)
    }
    devDepsChecker('@babel/plugin-transform-runtime', true)
    devDepsChecker('@babel/core', true)
    devDepsChecker('@babel/preset-env', true)
  }

  config.extendRollupConfig = initExtendRollupConfig(
    bannerFooter,
    // @ts-ignore
    config.externals,
  )

  // console.log('use-bili', {
  //   config,
  //   // 'config.externals': config.externals,
  //   bundle,
  //   runtimeOpts,
  //   // 'process.env': JSON.parse(JSON.stringify(process.env)),
  // })

  return config
}
