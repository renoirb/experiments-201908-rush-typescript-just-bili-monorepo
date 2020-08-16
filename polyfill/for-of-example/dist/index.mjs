/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
// Private constant, only included from Person class.
const introductions = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is'
};
class Person {
  constructor(name = 'John Doe', lang = 'en') {
    this.name = name;
    this.lang = lang;

    if (lang) {
      this.lang = lang;
    }
  }

  talk(message) {
    const name = this.name;
    return `${name}: ${message}`;
  }

  introduction() {
    const name = this.name;
    const {
      lang = 'en'
    } = this;
    const message = lang in introductions ? introductions[lang] : introductions.en;
    return this.talk(`${message} ${name}`);
  }

  toString() {
    return this.introduction();
  }

}

const talk = (args) => {
    const name = typeof args.name === 'string' ? `${args.name}: ` : '';
    const message = typeof args.message === 'string' ? `${args.message}` : '...';
    return `${name}${message}`;
};
var index = (people = []) => {
    const out = [];
    for (const someone of people) {
        const { name = 'John Doe' } = someone || {};
        const message = 'Hiya!';
        out.push(talk({ name, message }));
    }
    return out;
};

export default index;
export { Person };
/*! Renoir Boulanger  */
//# sourceMappingURL=index.mjs.map
