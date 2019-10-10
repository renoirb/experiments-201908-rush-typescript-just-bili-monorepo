/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.0
 * (c) 
 * Released under the UNLICENSED License.
 */
/**
 * TypeScript support writing JavaScript too.
 * https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
 */
const greeter = message => `Howdy, ${message}`;

// Private constant, only included from Person class.
const introductions = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is'
};
class Person {
  constructor(name = 'John Doe', lang) {
    this.name = name;
    this.lang = lang;

    if (lang) {
      this.lang = lang;
    }
  }

  toString() {
    const name = this.name;
    const text = this.lang ? introductions[this.lang] : introductions.en;
    return `${text} ${name}`;
  }

}

var index = (people => {
  const out = [];

  for (const someone of people) {
    const {
      name = 'John Doe'
    } = someone || {};
    const p = new Person(name); // for (const [k, v] of Object.entries(rest)) {
    //   p[k] = v
    // }

    out.push(p);
  }

  return out;
});

export default index;
export { Person, greeter };
