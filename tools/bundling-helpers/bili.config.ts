import { Config, ConfigOutput } from 'bili'

const input = { index: 'src/index.ts' }

const output: ConfigOutput = {
  target: 'node',
  format: ['esm', 'cjs'],
  sourceMap: true,
  minify: true,
}

const config: Config = {
  banner: true,
  input,
  output,
}

export default config
