// @ts-nocheck

import { IProcessEnvRunTimeOptions } from './main'

/**
 * If we have DEBUG string in process.env, we might also
 * want to see what Babel has to say
 */
const babel = (__: NodeJS.Process, opts: IProcessEnvRunTimeOptions) => {
  const { hasBiliBundleNodeModulesOption, isDevModeVerbose } = opts

  // const targets = {};

  /**
   * #bundleNodeModulesBili
   *
   * Recently, babel improved how to transpile polyfills.
   * Polyfills are pieces of code meant to patch a missing feature for a given browser.
   * In bili, if we ask Rollup+Babel to `--bundle-node-modules`, we want to make sure
   * any dependencies are part of the bundle, not required.
   *
   * ----
   * TODO: Improve detection if bili config has bundleNodeModules
   *
   * We'll need to make the following toggle work from both Bili ways of togglig features.
   * Either from CLI option `--bundle-node-modules` or
   * bili's Config `{"bundleNodeModules": true}`.
   *
   * If bili has option bundleNodeModules, we DO NOT WANT:
   * - @babel/preset-env to be `useBuiltIns: true` with usage as value
   * - We want to EXCLUDE core-js runtime so that it can be inlined.
   *
   * See https://github.com/adolt/rollup-babel-issue
   *
   * Other links found related to this:
   * - https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
   * - https://github.com/rollup/rollup-plugin-babel/issues/322
   * - https://github.com/rollup/rollup-plugin-babel/issues/254
   * - https://github.com/babel/babel/issues/8754
   * - https://github.com/rollup/rollup-plugin-babel/issues/306#issuecomment-495951230
   * - https://babeljs.io/docs/en/babel-plugin-transform-runtime#via-babelrc-recommended
   * - https://github.com/rollup/rollup/issues/2474#issuecomment-478130761
   */
  const plugins = []
  const exclude = []

  if (hasBiliBundleNodeModulesOption) {
    plugins.push([
      'module:@babel/plugin-transform-runtime',
      {
        corejs: 3,
        // TODO: Which of this here, or `/regenerator/` is needed to make it work. TBD. Later.
        // TODO: Check if package.json has required corejs deps and adjust corejs plugin config
        helpers: true,
        useESModules: true,
      },
    ])

    exclude.push(...[/regenerator/, /runtime-corejs3/, /core-js/])
  }

  // console.log('1 use-bili hasBiliBundleNodeModulesOption', {
  //   hasBiliBundleNodeModulesOption,
  //   plugins: JSON.parse(JSON.stringify(plugins)),
  // })

  const out = {
    // runtimeHelpers: true,
    presets: [
      [
        require('@babel/preset-env'),
        {
          /**
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
          useBuiltIns: hasBiliBundleNodeModulesOption ? false : 'usage',
          corejs: hasBiliBundleNodeModulesOption ? undefined : 3,
          // targets,
          debug: isDevModeVerbose,
        },
      ],
    ],
    plugins,
    exclude,
  }

  // console.log('2 use-bili hasBiliBundleNodeModulesOption', {
  //   hasBiliBundleNodeModulesOption,
  //   'out.presets[0]': JSON.parse(JSON.stringify(out.presets[0])),
  // })

  return out
}

export const plugins = (p: NodeJS.Process, o: IProcessEnvRunTimeOptions) => ({
  babel: babel(p, o),
})
