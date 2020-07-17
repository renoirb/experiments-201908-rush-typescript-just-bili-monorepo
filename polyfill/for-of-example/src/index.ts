import type { IPersonLikeInterface, LangCodeType } from './person'
import { Person } from './person'

export type { IPersonLikeInterface, LangCodeType }
export { Person }

export default (people: Partial<IPersonLikeInterface>[] = []): Person[] => {
  const out: Person[] = []
  for (const someone of people) {
    const { name = 'John Doe', lang } = someone || {}
    const p = new Person(name, lang)
    out.push(p)
  }
  return out
}
