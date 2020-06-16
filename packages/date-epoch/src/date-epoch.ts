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
      case Number.isFinite(epoch):
        value = coerceMilliseconds(epoch)
        break

      case epoch && 'getTime' in epoch:
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
  }

  public toJSON(): number {
    return this._epoch
  }

  public toString(): string {
    return String(this._epoch)
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
