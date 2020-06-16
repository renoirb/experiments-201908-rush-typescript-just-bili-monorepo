import { Config, ConfigOutput } from 'bili'
import bundlingHelper from '@renoirb/tools-bundling-helpers'

const bundleInfo = bundlingHelper(__dirname, {
  vendor: 'Renoir Boulanger',
})

const input = { index: 'src/index.ts' }

const output: ConfigOutput = {
  minify: true,
  sourceMap: true,
  target: 'node',
  format: ['esm', 'cjs'],
}

const config: Config = {
  banner: bundleInfo.banners.banner,
  bundleNodeModules: true,
  input,
  output,
}

export default config
