/**
 * IPackageJson
 * https://docs.npmjs.com/files/package.json#people-fields-author-contributors
 */
export interface PeopleField {
  name?: string
  email?: string
  url?: string
}

const stripSlash = (str: string): string => {
  return String(str).replace(/\/$/, '')
}

/*!
 * stringify-author <https://github.com/jonschlinkert/stringify-author>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT license.
 *
 * @public
 */
export const stringifyAuthor = (author: any): string => {
  if (typeof author !== 'object') {
    throw new Error('expected an author to be an object')
  }

  const tmpl = { name: ['', ''], email: ['<', '>'], url: ['(', ')'] }
  let str = ''

  if (author.url) {
    author.url = stripSlash(author.url)
  }

  for (const key in tmpl) {
    if (Reflect.has(author || {}, key)) {
      // @ts-ignore
      str += tmpl[key][0] + author[key] + tmpl[key][1] + ' '
    }
  }
  return str.trim()
}
