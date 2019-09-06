import { Config } from 'bili';
import bili from '@frontend-bindings/conventions-use-bili';

const config: Config = bili('src/index.ts')(process.env);

export default config;
