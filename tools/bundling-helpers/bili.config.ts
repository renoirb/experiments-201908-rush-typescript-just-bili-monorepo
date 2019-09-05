import { Config, ConfigOutput } from 'bili';

const input = 'src/index.ts';

const output: ConfigOutput = {
  sourceMap: true,
  minify: true,
};

const config: Config = {
  banner: true,
  input,
  output,
};

export default config;
