import { Config } from 'bili'
import type { IProcessEnvRunTimeOptions } from './types'

export default (
  p: NodeJS.Process,
  cfg: Config,
): Readonly<IProcessEnvRunTimeOptions> => {
  const { DEBUG = '', BILI_BUNDLE_NODE_MODULES = '' } = p.env
  const processEnvKeys = Object.keys(p.env)

  // console.log('runtime', process.env)

  let hasBiliBundleNodeModulesOption = BILI_BUNDLE_NODE_MODULES === 'true'
  let isDevModeVerbose = String(DEBUG).length > 1
  const isCI = processEnvKeys.includes('CI_SERVER') // || processEnvKeys.includes('CI')
  if (!isCI) {
    isDevModeVerbose = true
  }
  if (cfg.bundleNodeModules) {
    hasBiliBundleNodeModulesOption = cfg.bundleNodeModules === true
  }
  const out: IProcessEnvRunTimeOptions = {
    hasBiliBundleNodeModulesOption,
    isDevModeVerbose,
  }

  return Object.freeze(out)
}
