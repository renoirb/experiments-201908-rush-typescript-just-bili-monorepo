import { MonorepoUtilsCommandLine } from './command-line'

const commandLine = new MonorepoUtilsCommandLine()
commandLine.execute().catch(console.error) // CommandLineParser.execute() should never reject the promise
