import { babel } from './babel'
import { IProcessEnvRunTimeOptions } from '../main'

export const plugins = (p: NodeJS.Process, o: IProcessEnvRunTimeOptions) => ({
  babel: babel(p, o),
})
