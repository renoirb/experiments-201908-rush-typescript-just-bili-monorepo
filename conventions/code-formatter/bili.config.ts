import useBili from '@renoirb/conventions-use-bili'

const main = useBili(
  {
    input: {
      index: 'src/index.ts',
      start: 'src/start.ts',
    },
    bundleNodeModules: true,
    output: {
      target: 'node',
      fileName: '[name].cjs',
      minify: false,
    },
    externals: [
      'spawn-sync', // from cross-spawn which is from execa which is from term-size which is from boxen
    ],
  },
  { firstYear: 2003 },
)

export default main
