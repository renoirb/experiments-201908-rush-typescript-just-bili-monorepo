import { Config, ConfigOutput } from 'bili'

const input = { index: 'src/index.ts' }

const output: ConfigOutput = {
  target: 'node',
  format: ['esm', 'cjs'],
  sourceMap: true,
  minify: false,
}

const config: Config = {
  banner: true,
  input,
  output,
  externals: [
    'spawn-sync', // from cross-spawn which is from execa which is from term-size which is from boxen
  ],
}

export default config
