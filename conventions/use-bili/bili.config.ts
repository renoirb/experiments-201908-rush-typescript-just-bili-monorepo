import { Config, ConfigOutput } from 'bili'
import {
  default as bundlingHelpersMain,
  PackageIdentityInterface,
} from '@renoirb/tools-bundling-helpers'

const input = { index: 'src/index.ts' }

const output: ConfigOutput = {
  minify: true,
  sourceMap: true,
  target: 'node',
  format: ['esm', 'cjs'],
}

let banner = true
const vendor = '@renoirb/conventions-use-bili Author'

/**
 * What this package will encapsulate.
 * But we want that bundle to do it for itself.
 */
const brandObj = {
  vendor,
  author: {
    name: vendor,
  },
}
const pkg: PackageIdentityInterface = bundlingHelpersMain(__dirname, brandObj)
if (pkg.banners.banner) {
  banner = pkg.banners.banner
}

const config: Config = {
  banner,
  bundleNodeModules: true,
  input,
  output,
}

export default config
