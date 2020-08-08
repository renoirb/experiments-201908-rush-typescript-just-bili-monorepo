/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-null */

/**
 * camelCase transforms kebab-case to kebabCase.
 *
 * Ideally, this should be imported from lodash.camelCase
 * https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js
 *
 * @param {string} str string to strip off dashes
 */
export function camelCase(str: string): string {
  const replacer = (match: string, index: number): string => {
    if (+match === 0) {
      return ''
    }
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  }
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, replacer).replace(/-/g, '')
}

/**
 * Create cached version of a pure function
 *
 * https://github.com/vuejs/vue/blob/2.6/dist/vue.runtime.esm.js#L150
 *
 * https://egghead.io/lessons/typescript-overload-a-function-with-typescript-s-overload-signatures
 * https://justinnoel.dev/2018/10/21/understanding-lodash-memoize/
 *
 * @param {Function} fn
 */
export function cached(fn: any): any {
  const cache = Object.create(null)
  return function cachedFn(str: number | string) {
    const hit = cache[str]
    return hit || (cache[str] = fn.call(null, str))
  }
}

/*!
 * stringify-author <https://github.com/jonschlinkert/stringify-author>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */
export const stringifyAuthor = (author: any): string => {
  if (typeof author !== 'object') {
    throw new Error('expected an author to be an object')
  }

  const tmpl = { name: ['', ''], email: ['<', '>'], url: ['(', ')'] }
  let str = ''

  if (author.url) {
    author.url = String(author.url).replace(/\/$/, '')
  }

  for (const key in tmpl) {
    if (Reflect.has(author || {}, key)) {
      // @ts-ignore
      str += tmpl[key][0] + author[key] + tmpl[key][1] + ' '
    }
  }
  return str.trim()
}
