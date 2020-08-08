import { Config } from 'bili'
import { RollupBabelInputPluginOptions } from '@rollup/plugin-babel'

export type { RollupBabelInputPluginOptions }
export type { Options as BabelPluginTransformRuntimeOptions } from 'babel__plugin-transform-runtime'
export type { Options as BabelPresetEnvOptions } from 'babel__preset-env'

export type IExtendRollupConfig = NonNullable<Config['extendRollupConfig']>
export type IRollupConfig = ReturnType<IExtendRollupConfig>
export type IExternals = Config['externals'] &
  IRollupConfig['inputConfig']['external']

export type IRollupBabelHelpersOption = NonNullable<
  RollupBabelInputPluginOptions['babelHelpers']
>

export type IRollupBabelPluginsArray = NonNullable<
  RollupBabelInputPluginOptions['plugins']
>

export interface IProcessEnvRunTimeOptions {
  /**
   * Inline dependencies/externals
   */
  hasBiliBundleNodeModulesOption: boolean

  /**
   * Whether or not we want more logging
   */
  isDevModeVerbose: boolean
}

export interface IBundlingOptions {
  /**
   * Whether or not we want to include core-js
   * as part of the build process
   */
  withCore: boolean
}

export type BiliInputConfigEntryObject = Record<string | 'index', string>
