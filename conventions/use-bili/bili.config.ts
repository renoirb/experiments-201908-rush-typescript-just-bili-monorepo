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
  externals: [
    '@rushstack/node-core-library',
    'spawn-sync', // from cross-spawn which is from execa which is from term-size which is from boxen
  ],
  input,
  output,
}

export default config
