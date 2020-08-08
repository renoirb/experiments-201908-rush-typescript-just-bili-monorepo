import type { IExternals, IExtendRollupConfig, IRollupConfig } from './types'
import { IBannerFooter } from '@renoirb/package-json-utils'

export default (
  bannerFooter: IBannerFooter,
  externals: IExternals,
): IExtendRollupConfig => (config: IRollupConfig): IRollupConfig => {
  const { banner, footer } = bannerFooter
  config.outputConfig.banner = banner
  config.outputConfig.footer = footer
  if (externals) {
    config.inputConfig.external = externals
  }

  // console.log({
  //   'RollupConfig.outputConfig': JSON.parse(
  //     JSON.stringify(config.outputConfig),
  //   ),
  //   'RollupConfig.inputConfig.plugins[]': config.inputConfig.plugins.map((i) =>
  //     JSON.parse(JSON.stringify(i)),
  //   ),
  //   'mod.builtinModules': mod.builtinModules,
  //   module,
  // })

  return config
}
