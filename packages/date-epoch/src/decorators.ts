/**
 * Make a number or string object property to have property getter return DateEpoch
 *
 * UNFINISHED! — Tabling (and disabling ESLint) for now, as ECMAScript does not support natively decorators
 * ... and ECMAScript getter can do the same. With less complexion.
 *
 * Bookmarks:
 * - https://www.typescriptlang.org/docs/handbook/decorators.html#metadata
 * - https://blog.wizardsoftheweb.pro/typescript-decorators-property-decorators/
 */

import { DateEpoch } from './date-epoch'

export const epoch = (): PropertyDecorator => {
  let value: number | string
  return (target: any, propertyKey: string | symbol) => {
    const update = Reflect.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: (): DateEpoch => {
        return new DateEpoch(value)
      },
      set: (newValue: number | string) => {
        value = newValue
      },
    })
    // If the update failed, something went wrong
    if (!update) {
      // Kill everything
      throw new Error('Unable to update property')
    }
  }
}
