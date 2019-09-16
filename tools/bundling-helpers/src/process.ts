/**
 * Should be extending `Partial<NodeJS.Process>`
 *
 * See `@types/node` in `globals.d.ts`
 */
export interface MaybeNodeProcessContext extends Partial<NodeJS.Process> {
  /**
   * What CLI arguments were provided
   * @type {NodeJS.Process.argv}
   */
  argv?: string[]
  cwd?: () => string
  env?: NodeJS.ProcessEnv
  version?: string
  arch?: string
  platform?: NodeJS.Platform
  release?: NodeJS.ProcessRelease
}

export const hasProcessCliArg = (
  name: string,
  context?: MaybeNodeProcessContext,
): boolean => {
  const { argv = [] } = context || {}
  return [...argv].includes(name)
}

export const getProcessCliArgValuePair = (
  name: string,
  context?: MaybeNodeProcessContext,
): null | [string, string] => {
  const { argv = [] } = context || {}
  const hasArg = [...argv].includes(name)
  if (hasArg) {
    const argIndex = [...argv].indexOf(name)
    const argValIndex = argIndex + 1
    const argName = Reflect.has(argv, argIndex)
      ? Reflect.get(argv, argIndex)
      : null
    let argVal = Reflect.has(argv, argValIndex)
      ? Reflect.get(argv, argValIndex)
      : null
    // If `--help --foo`, we do not want the next argument
    if (/^--/.test(argVal)) {
      argVal = null
    }
    if (argName && argVal) {
      return [argName, argVal]
    }
  }

  return null
}
