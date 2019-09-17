import { Config } from 'bili'
import bili from '@renoirb/conventions-use-bili'

const config: Config = bili('src/index.js')(process.env)

export default config
