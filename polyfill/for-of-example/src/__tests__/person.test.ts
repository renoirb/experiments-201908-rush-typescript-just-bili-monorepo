import { default as whatever, Person, PersonLikeInterface } from '..'
import { people } from './__fixtures__'

describe('Person', () => {
  let subject: Person
  test('constructor', () => {
    const { name } = people[0] as PersonLikeInterface
    subject = new Person(name)
    expect(String(subject)).toBe(`Hello, my name is ${name}`)
  })

  test('default export', () => {
    // @ts-ignore
    const list = whatever(people)
    expect(list[0]).toMatchObject({ name: 'Luke Skywalker' })
    expect(list).toMatchSnapshot()
  })
})
