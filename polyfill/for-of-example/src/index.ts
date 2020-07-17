import type { PersonLikeInterface, LangType, GenderType } from './person'
import { Person } from './person'

export type { PersonLikeInterface, LangType, GenderType }
export { Person }

export default (people: Partial<PersonLikeInterface>[]): Person[] => {
  const out: Person[] = []
  for (const someone of people) {
    const { name = 'John Doe' } = someone || {}
    const p = new Person(name)
    out.push(p)
  }
  return out
}
