import { Config } from 'bili';
import bili from '@frontend-bindings/conventions-use-bili';

const config: Config = bili('src/index.js')(process.env);

export default config;
