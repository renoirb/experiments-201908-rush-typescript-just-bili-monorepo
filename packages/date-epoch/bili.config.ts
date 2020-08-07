import useBili from '@renoirb/conventions-use-bili'

const main = useBili(
  {
    input: 'src/index.ts',
    bundleNodeModules: true,
    externals: [
      'spawn-sync', // from cross-spawn which is from execa which is from term-size which is from boxen
    ],
  },
  { firstYear: 2003 },
)

export default main
