// Keep

import type {
  IRollupBabelHelpersOption,
  BabelPresetEnvOptions,
  RollupBabelInputPluginOptions,
  IRollupBabelPluginsArray,
  BabelPluginTransformRuntimeOptions,
  IProcessEnvRunTimeOptions,
} from '../types'

/**
 * Configure Rollup's babel plugin.
 *
 * The following is taking care of shaping bili config
 * so that we don't need to pollute each project's bili.config.ts
 */
export const babel = (opts: IProcessEnvRunTimeOptions) => {
  const { hasBiliBundleNodeModulesOption, isDevModeVerbose } = opts || {}

  /**
   * Handle how Bili/Rollup/Babel to handle bundling modules.
   *
   * If we we want to "bundleNodeModules", from a host package,
   * we have to tell Rollup/Babel about it.
   *
   * - Rollup has 'babelHelpers' to 'inline' instead of using default 'bundled'.
   * - 'babelHelpers' was previously named 'runtimeHelpers' (and finding this took 6 hours!)
   *
   * Bookmarks:
   * - https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
   * - https://github.com/rollup/rollup-plugin-babel/issues/322
   * - https://github.com/egoist/bili/blob/v5.0.5/src/index.ts#L270
   * - https://github.com/rollup/plugins/blob/babel-v5.1.0/packages/babel/src/index.js#L43ù
   */
  let babelHelpers: IRollupBabelHelpersOption = 'bundled'

  const plugins: IRollupBabelPluginsArray = []

  const exclude: RegExp[] = []

  if (hasBiliBundleNodeModulesOption) {
    babelHelpers = 'runtime'
    /**
     * Tell Rollup to use Babel's transform-runtime (i.e. do stuff while transpiling).
     *
     * @TODO: Check if package.json has required corejs deps and adjust corejs plugin config
     *
     * https://babeljs.io/docs/en/babel-plugin-transform-runtime#options
     *
     * @TODO: There might be a logic error here when we want bundleNodeModules
     *
     * When hasBiliBundleNodeModulesOption, we get message:
     *
     * > The `corejs` option only has an effect when the `useBuiltIns` option is not `false`
     *
     * Which makes sense, we should either have usage.
     * But, that's not a priority for now, rework later.
     */
    plugins.push([
      'module:@babel/plugin-transform-runtime',
      {
        corejs: 3,
        helpers: true,
        useESModules: true,
        regenerator: false,
      } as BabelPluginTransformRuntimeOptions,
    ])
    exclude.push(...[/runtime-corejs3/, /core-js/, /@babel\/runtime/])
  }

  /**
   * #bundleNodeModulesBili
   *
   * Polyfills are pieces of code meant to patch a missing feature for a given browser.
   * In bili, if we ask Rollup+Babel to `--bundle-node-modules`, we want to make sure
   * any dependencies are part of the bundle, not required.
   *
   * We'll need to make the following toggle work from both Bili ways of togglig features.
   * Either from CLI option `--bundle-node-modules` or bili's Config "bundleNodeModules" to `true`.
   *
   * If bili has option "bundleNodeModules", we DO NOT WANT:
   * - @babel/preset-env to be `useBuiltIns` with "usage" as value (instead of `true` or `false`)
   * - We want to EXCLUDE core-js runtime so that it can be inlined (see `exclude` above).
   *
   * Other links found related to this:
   * - https://github.com/rollup/rollup-plugin-babel/issues/306#issuecomment-495951230
   * - https://babeljs.io/docs/en/babel-plugin-transform-runtime#via-babelrc-recommended
   * - https://github.com/rollup/rollup/issues/2474#issuecomment-478130761
   */
  const out: RollupBabelInputPluginOptions = {
    babelHelpers,
    presets: [
      [
        'module:@babel/preset-env',
        // require('bili/babel'),
        {
          // https://github.com/babel/babel/issues/8754
          // https://github.com/rollup/rollup-plugin-babel/issues/254
          useBuiltIns: hasBiliBundleNodeModulesOption ? false : 'usage',
          corejs: hasBiliBundleNodeModulesOption ? 3 : undefined,
          debug: isDevModeVerbose,
        } as BabelPresetEnvOptions,
        '@renoirb/conventinos-use-bili babel/preset-env',
      ],
    ],
    plugins,
    exclude,
  }

  /*
  console.log('1 use-bili hasBiliBundleNodeModulesOption', {
    hasBiliBundleNodeModulesOption,
    'out.plugins': JSON.parse(JSON.stringify(out.plugins)),
    'out.exclude': JSON.parse(JSON.stringify(out.exclude)),
    // @ts-ignore
    'out.presets[0]': JSON.parse(JSON.stringify(out.presets[0])),
  })
  */

  return out
}
