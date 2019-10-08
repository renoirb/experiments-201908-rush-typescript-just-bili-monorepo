export * from './greeter'

export type LangType = 'fr' | 'pt' | 'en'
export type GenderType = 'M' | 'F' | 'A'

export interface PersonLikeInterface {
  /**
   * The first name of the person
   */
  name: string
  /**
   * The age of the person
   */
  age?: number
  /**
   * Gender of the person
   */
  gender?: GenderType
  /**
   * Spoken language of the person (excluding region)
   */
  lang?: LangType
}

const introductions: { [lang: string]: string } = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is',
}

export class Person implements PersonLikeInterface {
  age?: number

  gender?: GenderType

  constructor(
    public readonly name = 'John Doe',
    public readonly lang?: LangType,
  ) {
    if (lang) {
      this.lang = lang
    }
  }

  toString(): string {
    const name = this.name
    const text = this.lang ? introductions[this.lang] : introductions.en
    return `${text} ${name}`
  }
}

export default (people: PersonLikeInterface[]): Person[] => {
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
