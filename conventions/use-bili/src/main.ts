import { Config } from 'bili';
import { plugins as initPlugins } from './plugins';
import { input as initInput, BiliInputDescriptor } from './input';
// import { packageNameToModuleName, packageExtractExternals } from '@frontend-bindings/tools-bundling-helpers';

/**
 * @public
 * @param {NodeJS.ProcessEnv} env NodeJS Runtime process.env value
 */
export const main = (
  inputArg: string | BiliInputDescriptor = 'src/index.ts',
) => (env: NodeJS.ProcessEnv = {}): Config => {
  const plugins = initPlugins(env);
  const input = initInput(inputArg);

  // Unfinished work.
  // ... should encapsulate what ../bili.config.ts does

  const out: Config = {
    input,
    plugins,
  };

  return out;
};
