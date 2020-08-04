
import { log } from './utils'

const hasCliArg = (name: string): boolean => {
  const context: NodeJS.Process = process || {}
  const { argv = [] } = context
  return argv.includes(name)
}

/**
 * @param {string} name — NodeJS.Process CLI argv name
 */
const getCliArg = (name: string): false | [string, string | true] => {
  if (hasCliArg(name)) {
    const context: NodeJS.Process = process || {}
    const { argv = [] } = context
    const argIndex = [...argv].indexOf(name)
    const argValIndex = argIndex + 1
    const argName = Reflect.has(argv, argIndex)
      ? Reflect.get(argv, argIndex)
      : false
    let argVal = Reflect.has(argv, argValIndex)
      ? Reflect.get(argv, argValIndex)
      : false
    // If `--help --foo`, we do not want the next argument
    if (/^--/.test(argVal)) {
      argVal = true
    }
    if (argName && argVal) {
      return [argName, argVal]
    }
  }

  return false
}

/**
 * Check if process.env has a flag we are looking for
 *
 * https://docs.gitlab.com/ee/ci/variables/#syntax-of-environment-variables-in-job-scripts
 *
 * @param {string} name — name of the environment variable
 */
const hasEnvFlag = (name: string): boolean => {
  const context: NodeJS.Process = process || {}
  const { env = {} } = context
  const processEnvKeys = Object.keys(env)
  return processEnvKeys.includes(name)
}

/**
 * Command Line (CLI) Utilities.
 *
 * Helpers so we can avoid boilerplate CLI checks
 */
export class CommandLineUtilities {
  static getCliArg = getCliArg
  static hasCliArg = hasCliArg
  static hasEnvFlag = hasEnvFlag
  static log = log
}
