export type LangCodeType = 'fr' | 'pt' | 'en'

export interface IPersonLikeInterface {
  /**
   * The first name of the person
   */
  name: string
  /**
   * Spoken language of the person (excluding region)
   */
  lang: LangCodeType
}

// Private constant, only included from Person class.
const introductions: { [lang: string]: string } = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is',
}

export class Person implements IPersonLikeInterface {
  constructor(
    public readonly name = 'John Doe',
    public readonly lang: LangCodeType = 'en',
  ) {
    if (lang) {
      this.lang = lang
    }
  }

  talk(message: string): string {
    const name = this.name
    return `${name}: ${message}`
  }

  introduction(): string {
    const name = this.name
    const { lang = 'en' } = this
    const message =
      lang in introductions ? introductions[lang] : introductions.en
    return this.talk(`${message} ${name}`)
  }

  toString(): string {
    return this.introduction()
  }
}
