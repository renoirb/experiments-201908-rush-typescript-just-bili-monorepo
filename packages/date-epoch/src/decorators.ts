// @ts-nocheck

import { DateEpoch } from './date-epoch';

/**
 * UNFINISHED
 *
 * @todo
 *
 * #Handle-String-Or-Number-to-Date
 * Since our APIs might return either number, floats, or strings that has numbers in them
 * we'll have to handle it.
 */

export type FuzzyDateType = number | string | Date;

export const createDateEpoch = (epoch: number | string): DateEpoch => {
  const e = new DateEpoch(epoch);
  return e;
};

export const stringOrNumberToDateSetter = (newVal: FuzzyDateType): Date => {
  if (typeof newVal === 'number' || typeof newVal === 'string') {
    const e = createDateEpoch(newVal);
    return e.toDate();
  } else {
    return newVal;
  }
};

export const epoch = (target: any, propertyKey: string) => {
  function factory(isGet: boolean) {
    let value = target[propertyKey];
    return function(newValue?: FuzzyDateType) {
      const getter = function getterClosure(): Date {
        return value;
      };
      const setter = function setterClosure(val: FuzzyDateType) {
        value = stringOrNumberToDateSetter(val);
      };
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
      if (isGet) {
        return target[propertyKey];
      } else {
        target[propertyKey] = newValue;
      }
    };
  }
  Object.defineProperty(target, propertyKey, {
    get: factory(true),
    set: factory(false),
    enumerable: true,
    configurable: false,
  });
};
