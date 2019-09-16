/**
 * If we have DEBUG string in process.env, we might also
 * want to see what Babel has to say
 */
const babel = (env: NodeJS.ProcessEnv = {}) => {
  const { DEBUG = '', BILI_BUNDLE_NODE_MODULES = '' } = env;
  const debug = String(DEBUG).length > 1;

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
   * - @babel/preset-env to has useBuiltIns with usage as value
   * - We want to EXCLUDE core-js runtime so that it can be inlined.
   *
   * See https://github.com/adolt/rollup-babel-issue
   *
   * Other links found related to this:
   * - https://github.com/rollup/rollup-plugin-babel/issues/322
   * - https://github.com/rollup/rollup-plugin-babel/issues/254
   * - https://github.com/babel/babel/issues/8754
   * - https://github.com/rollup/rollup-plugin-babel/issues/306#issuecomment-495951230
   * - https://babeljs.io/docs/en/babel-plugin-transform-runtime#via-babelrc-recommended
   * - https://github.com/rollup/rollup/issues/2474#issuecomment-478130761
   */
  const hasBiliBundleNodeModulesOption = BILI_BUNDLE_NODE_MODULES === 'true';
  const plugins = [];
  const exclude = [];
  if (hasBiliBundleNodeModulesOption) {
    plugins.push([
      'module:@babel/plugin-transform-runtime',
      {
        corejs: 3,
        // TODO: Which of this here, or `/regenerator/` is needed to make it work. TBD. Later.
        helpers: true,
      },
    ]);
    exclude.push(...[/regenerator/, /runtime-corejs3/, /core-js/]);
  }

  const out = {
    runtimeHelpers: true,
    presets: [
      [
        // '@frontend-bindings/conventions-use-bili',
        '@babel/preset-env',
        {
          /**
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
          corejs: 3,
          // targets,
          debug,
        },
      ],
    ],
    plugins,
    exclude,
  };

  // console.log('hasBiliBundleNodeModulesOption', hasBiliBundleNodeModulesOption, JSON.stringify(out))

  return out;
};

export const plugins = (env: NodeJS.ProcessEnv = {}) => ({ babel: babel(env) });
