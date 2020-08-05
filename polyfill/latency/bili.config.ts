import useBili from '@renoirb/conventions-use-bili'

const main = useBili(
  {
    input: 'src/index.ts',
    bundleNodeModules: true,
    output: {
      minify: false,
    }
  },
  { firstYear: 2003 },
)

export default main
