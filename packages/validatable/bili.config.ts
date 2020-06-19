import useBili from '@renoirb/conventions-use-bili'

const main = useBili(
  {
    input: 'src/index.js',
    bundleNodeModules: true,
    externals: [],
  },
  { firstYear: 2003 },
)

export default main
