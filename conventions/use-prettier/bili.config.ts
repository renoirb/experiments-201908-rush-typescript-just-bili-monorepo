import { Config, ConfigOutput } from 'bili'

const input = {
  index: 'src/index.ts',
  start: 'src/start.ts',
}

const output: ConfigOutput = {
  target: 'node',
  fileName: '[name].cjs',
  minify: false,
  sourceMap: true,
  format: 'cjs',
}

const config: Config = {
  banner: true,
  bundleNodeModules: true,
  externals: ['@rushstack/node-core-library'],
  input,
  output,
}

export default config
