import { Config, ConfigOutput } from 'bili'

const input = 'src/index.ts'

const output: ConfigOutput = {
  minify: false,
  sourceMap: true,
  target: 'node',
}

const config: Config = {
  banner: true,
  bundleNodeModules: true,
  externals: ['esm'],
  input,
  output,
}

export default config
