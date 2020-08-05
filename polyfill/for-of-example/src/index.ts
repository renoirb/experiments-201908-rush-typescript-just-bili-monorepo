import type { IPersonLikeInterface, LangCodeType } from './person'
import { Person } from './person'

export type { IPersonLikeInterface, LangCodeType }
export { Person }

const talk = (args: {name?: string, message: string}): string => {
  const name: string = typeof args.name === 'string' ? `${args.name}: ` : '';
  const message: string = typeof args.message === 'string' ? `${args.message}` : '...';
  return `${name}${message}`
}

export default (people: Partial<IPersonLikeInterface>[] = []): string[] => {
  const out: string[] = []
  for (const someone of people) {
    const { name = 'John Doe' } = someone || {}
    const message = 'Hiya!';
    out.push(talk({name, message}))
  }
  return out
}
