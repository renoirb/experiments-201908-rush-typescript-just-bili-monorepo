export * from './greeter'
export * from './person'
import { PersonLikeInterface, Person } from './person'

export default (people: Partial<PersonLikeInterface>[]): Person[] => {
  const out: Person[] = []
  for (const someone of people) {
    const { name = 'John Doe' } = someone || {}
    const p = new Person(name)
    // for (const [k, v] of Object.entries(rest)) {
    //   p[k] = v
    // }
    out.push(p)
  }
  return out
}
