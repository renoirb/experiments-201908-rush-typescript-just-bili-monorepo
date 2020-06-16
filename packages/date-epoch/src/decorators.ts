import { DateEpoch } from './date-epoch'
import type { FuzzyDateType } from './helpers'

/**
 * Make a number or string object property to have property getter return DateEpoch
 *
 * UNFINISHED! — Tabling for now, as ECMAScript does not support natively decorators
 * ... and ECMAScript getter can do the same. With less complexion.
 *
 * Bookmarks:
 * - https://www.typescriptlang.org/docs/handbook/decorators.html#metadata
 */
export const epoch: PropertyDecorator = (target, propertyKey) => {
  let value = Reflect.has(target, propertyKey)
    ? Reflect.get(target, propertyKey)
    : void 0
  const getter = (): DateEpoch => {
    try {
      const maybe = new DateEpoch(value)
      return maybe
    } catch (e) {
      throw e
    }
  }
  const setter = (val: FuzzyDateType) => {
    try {
      new DateEpoch(value)
      value = val
    } catch (e) {
      throw e
    }
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: false,
  })
}
