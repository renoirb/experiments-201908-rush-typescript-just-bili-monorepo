import { Config, ConfigOutput } from 'bili'

const input = { index: 'src/index.ts' }

const output: ConfigOutput = {
  minify: true,
  sourceMap: true,
  target: 'node',
  format: ['esm', 'cjs'],
}

const config: Config = {
  banner: true,
  bundleNodeModules: true,
  input,
  output,
}

export default config
