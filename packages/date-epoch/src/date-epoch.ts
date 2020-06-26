import { toDate, timestamp, coerceMilliseconds } from './helpers'

/**
 * DateEpoch: An utility to convert UNIX Epoch Integer into a Date Object.
 *
 * Helpers to work with UNIX Epoch notation and JavaScript Date objects.
 *
 * This should be an almost exact copy of [1], notice how strict typing had been added.
 *
 * [1]: https://bitsrc.io/renoirb/bindings/types/date-epoch/code
 */
export class DateEpoch {
  private readonly _epoch: number

  get epoch(): number {
    return this._epoch
  }

  /**
   * Constructor: Optimistically take a number and try to create a Date object.
   *
   * @param epoch Hopefully a Number or a String with a Number, hopefully an UNIX Epoch.
   */
  public constructor(epoch?: any) {
    let value: number
    switch (true) {
      case Number.isFinite(+epoch):
        value = coerceMilliseconds(epoch)
        break

      case Object.prototype.toString.call(epoch) === '[object Date]':
        value = epoch.getTime()
        break

      default:
        value = timestamp()
        break
    }
    this._epoch = value
    Object.defineProperty(this, '_epoch', {
      value,
      writable: false,
      configurable: false,
      enumerable: false,
    })
    Object.defineProperty(this, Symbol.toStringTag, { value: 'DateEpoch' })
  }

  [Symbol.toPrimitive](hint: 'default'): string
  [Symbol.toPrimitive](hint: 'string'): string
  [Symbol.toPrimitive](hint: 'number'): number

  /**
   * Converts a Date object to a string or number.
   *
   * Notes: This is ECMAScript's "well known" protocol.
   * See https://exploringjs.com/deep-js/ch_type-coercion.html#example-coercion-algorithms
   *
   * @param hint The strings "number", "string", or "default" to specify what primitive to return.
   *
   * @returns A number if 'hint' was "number", a string if 'hint' was "string" or "default".
   */
  [Symbol.toPrimitive](hint: string): string | number {
    if (/number/.test(hint)) {
      return this._epoch
    } else {
      return this.toString()
    }
  }

  public toJSON(): Date {
    return this.toDate()
  }

  public toString(): string {
    return String(this.toDate())
  }

  /**
   * Convert internal epoch into a native Date object.
   *
   * @returns Date
   */
  public toDate(): Date {
    return toDate(this._epoch)
  }
}
