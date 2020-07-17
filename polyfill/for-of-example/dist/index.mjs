/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
const n = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is',
}
class t {
  constructor(n = 'John Doe', t = 'en') {
    ;(this.name = n), (this.lang = t), t && (this.lang = t)
  }
  talk(n) {
    return `${this.name}: ${n}`
  }
  introduction() {
    const t = this.name,
      { lang: o = 'en' } = this,
      e = o in n ? n[o] : n.en
    return this.talk(`${e} ${t}`)
  }
  toString() {
    return this.introduction()
  }
}
export default (n = []) => {
  const o = []
  for (const e of n) {
    const { name: n = 'John Doe', lang: s } = e || {},
      r = new t(n, s)
    o.push(r)
  }
  return o
}
export { t as Person }
//# sourceMappingURL=index.mjs.map
