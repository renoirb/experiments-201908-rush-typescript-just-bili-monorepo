import useBili from '@renoirb/conventions-use-bili'

const main = useBili(
  {
    input: {
      index: 'src/index.ts',
      start: 'src/start.ts',
    },
    bundleNodeModules: true,
    externals: [],
    output: {
      target: 'node',
      fileName: '[name].cjs',
      minify: false,
    },
  },
  {
    firstYear: 2003,
  },
)

export default main
