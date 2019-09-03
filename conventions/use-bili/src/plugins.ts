/**
 * If we have DEBUG string in process.env, we might also
 * want to see what Babel has to say
 */
const babel = (env: NodeJS.ProcessEnv = {}) => {
  const { DEBUG = '' } = env;
  const debug = String(DEBUG).length > 1;

  // const targets = {};

  const out = {
    presets: [
      [
        // '@frontend-bindings/conventions-use-bili',
        '@babel/preset-env',
        {
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#options
          useBuiltIns: 'usage',
          corejs: 3,
          // targets,
          debug,
        },
      ],
    ],
  };

  return out;
};

export const plugins = (env: NodeJS.ProcessEnv = {}) => ({ babel: babel(env) });
