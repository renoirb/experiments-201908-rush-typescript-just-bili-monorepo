/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.0
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.0
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
const t = {
  fr: 'Bonsoir, mon nom est',
  pt: 'Oi gente, meu nome é',
  en: 'Hello, my name is',
}
class n {
  constructor(t = 'John Doe', n) {
    ;(this.name = t), (this.lang = n), n && (this.lang = n)
  }
  talk(t) {
    return `${this.name}: ${t}`
  }
  introduction() {
    const n = this.name,
      { lang: e = 'en' } = this,
      o = e in t ? t[e] : t.en
    return this.talk(`${o} ${n}`)
  }
  toString() {
    return this.introduction()
  }
}
;(exports.Person = n),
  (exports.default = (t) => {
    const e = []
    for (const o of t) {
      const { name: t = 'John Doe' } = o || {},
        s = new n(t)
      e.push(s)
    }
    return e
  })
//# sourceMappingURL=index.js.map
