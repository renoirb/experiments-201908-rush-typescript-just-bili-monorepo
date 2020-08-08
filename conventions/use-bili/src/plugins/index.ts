import { babel } from './babel'
import { IProcessEnvRunTimeOptions } from '../types'

export default (o: IProcessEnvRunTimeOptions) => ({
  babel: babel(o),
})
