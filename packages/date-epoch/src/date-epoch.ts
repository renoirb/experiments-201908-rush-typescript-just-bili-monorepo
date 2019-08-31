/* tslint:disable:typedef no-any */

import {
  getDateFromEpoch,
  getTimeNowUtcMillliseconds,
  milliseconds,
} from './helpers';

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
  public epoch: number;

  /**
   * Constructor: Optimistically take a number and try to create a Date object.
   *
   * @param arg Hopefully a Number or a String with a Number, hopefully an UNIX Epoch.
   */
  constructor(arg: any = null) {
    switch (true) {
      case arg === null:
        this.epoch = getTimeNowUtcMillliseconds();
        break;

      case Number.isFinite(arg):
        this.epoch = milliseconds(+arg);
        break;

      case Reflect.has(arg, 'getTime'):
        this.epoch = arg.getTime();
        break;

      default:
        this.epoch = getTimeNowUtcMillliseconds();
        break;
    }
  }

  public toJSON() {
    return {
      epoch: this.epoch,
    };
  }

  public toString(): string {
    return String(this.epoch);
  }

  /**
   * Convert internal epoch into a native Date object.
   *
   * @returns Date
   */
  public toDate(): Date {
    return getDateFromEpoch(this.epoch);
  }
}
