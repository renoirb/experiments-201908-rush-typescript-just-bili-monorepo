import { Config } from 'bili'
import bili from '@renoirb/conventions-use-bili'

const config: Config = bili('src/index.ts')(process)

export default {
  ...config,
  bundleNodeModules: true,
  externals: [],
}
