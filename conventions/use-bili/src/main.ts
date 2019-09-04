import { Config } from 'bili';
import { plugins as initPlugins } from './plugins';
import { input as initInput, BiliInputDescriptor } from './input';

// import { default as bundlingHelpersMain } from '@frontend-bindings/tools-bundling-helpers';
// import { resolve, dirname } from 'path';

/**
 * @public
 * @param {NodeJS.ProcessEnv} env NodeJS Runtime process.env value
 */
export const main = (
  inputArg: string | BiliInputDescriptor = 'src/index.ts',
) => (env: NodeJS.ProcessEnv = {}): Config => {
  const plugins = initPlugins(env);
  const input = initInput(inputArg);

  /**
   * Unfinished work.
   * ... should encapsulate what ../bili.config.ts does
   */
  // const { cwd } = process || {};
  // if (cwd) {
  //   const baseDir = resolve(dirname(cwd()));
  //   const bundle = bundlingHelpersMain(baseDir);
  //   console.log('foo', { bundle, baseDir });
  // }

  const out: Config = {
    input,
    plugins,
  };

  return out;
};
