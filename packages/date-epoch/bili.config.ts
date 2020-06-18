import { Config, ConfigOutput } from 'bili'
import bili from '@renoirb/conventions-use-bili'
import bundlingHelper from '@renoirb/tools-bundling-helpers'

const bundleInfo = bundlingHelper(__dirname, {
  vendor: 'Renoir Boulanger',
})

const input = { index: 'src/index.ts' }

const config: Config = bili(input)(process.env)

const output: ConfigOutput = {
  ...config.output,
  sourceMap: true,
  minify: true,
}

const main: Config = {
  ...config,
  bundleNodeModules: true,
  externals: [],
  banner: bundleInfo.banners.banner,
  output,
}

export default main
