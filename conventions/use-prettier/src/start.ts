import { CodeFormatterCommandLineParser } from './command-line-parser'

const parser = new CodeFormatterCommandLineParser()

parser.execute().catch((error) => {
  console.log(error)
  process.exit(1)
})
