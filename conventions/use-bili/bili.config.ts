import { Config, ConfigOutput } from 'bili'

const input = 'src/index.ts'

const output: ConfigOutput = {
  minify: false,
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
