import { Config } from 'bili'
import { plugins as initPlugins } from './plugins'
import { input as initInput, BiliInputDescriptor } from './input'

// import bundlingHelpers from '@renoirb/tools-bundling-helpers'
// import { resolve, dirname } from 'path'

/**
 * @public
 * @param {NodeJS.ProcessEnv} env NodeJS Runtime process.env value
 */
export const main = (
  inputArg: string | BiliInputDescriptor = 'src/index.ts',
) => (process: NodeJS.Process): Config => {
  const plugins = initPlugins(process.env)
  const input = initInput(inputArg)

  // const { PWD } = process.env
  // console.log('bili main', { 'process.env': process.env })

  /**
   * Unfinished work.
   * ... should encapsulate what ../bili.config.ts does
   */
  // const { cwd } = process || {}
  // if (cwd) {
  //   const baseDir = resolve(dirname(cwd()))
  //   const bundle = bundlingHelpers(baseDir)
  //   console.log('deadbeef use-bili bundlingHelpers', { bundle, baseDir })
  // }

  const out: Config = {
    banner: true,
    input,
    plugins,
  }

  return out
}
