import { Config } from 'bili'
import type { IPackageIdentityInterface } from '@renoirb/tools-bundling-helpers'

export type ExtendRollupConfig = NonNullable<Config['extendRollupConfig']>
export type RollupConfig = ReturnType<ExtendRollupConfig>

export const extendRollupConfig = (
  identity: IPackageIdentityInterface,
): ExtendRollupConfig => (config: RollupConfig): RollupConfig => {
  const { banner, footer } = identity.banners
  config.outputConfig.banner = banner
  config.outputConfig.footer = footer
  return config
}
