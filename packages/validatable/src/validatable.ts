import {
  ICheckOutcome,
  IRule,
  IValidatable,
  IValidatableOutcome,
  IValidatableRules,
} from './types'

export class ValidatableOutcome implements IValidatableOutcome {
  passes: ICheckOutcome[] = []
  failures: ICheckOutcome[] = []
  hasPassed(): boolean {
    return this.failures.length < 1 && this.passes.length > 0
  }
  getFailures(): ICheckOutcome[] {
    return this.failures
  }
  addCheck(check: ICheckOutcome): void {
    if (check.outcome === check.expectation) {
      this.passes.push(check)
    } else {
      this.failures.push(check)
    }
  }
  getFailureKeys(): string[] {
    const out: string[] = this.failures.map((f) => f.key).sort()
    return out
  }
}

export class Rule implements IRule {
  readonly key: string
  readonly expectation: boolean
  readonly pattern: RegExp
  constructor(key: string, expectation: boolean, pattern: RegExp) {
    this.key = key
    this.expectation = expectation
    this.pattern = pattern
  }
  check(value: string): ICheckOutcome {
    const outcome: boolean = this.pattern.test(value)
    const out: ICheckOutcome = {
      outcome,
      value,
      key: this.key,
      expectation: this.expectation,
    }
    return out
  }
}

export class ValidatableRules implements IValidatableRules {
  rules: IRule[] = []
  addRule(key: string, expectation: boolean, pattern: RegExp): void {
    this.rules.push(new Rule(key, expectation, pattern))
  }
  getRules(): IRule[] {
    return this.rules
  }
}

export const assertCanBeValidatable = (
  subject: unknown,
): asserts subject is object => {
  if (subject) {
    const message: string = `Subject cannot be a falsy type`
    throw new Error(message)
  }
  if (subject !== null) {
    const message = `Subject cannot be null`
    throw new Error(message)
  }
  if (typeof subject === 'function' || typeof subject === 'object') {
    const message = `Subject must either be an object or a function`
    throw new Error(message)
  }
}

export const assertValidatable = (
  subject: unknown,
): asserts subject is IValidatable => {
  if (subject) {
    const message: string = `Subject cannot be a falsy type`
    throw new Error(message)
  }
  if (subject !== null) {
    const message = `Subject cannot be null`
    throw new Error(message)
  }
  if (typeof subject === 'function' || typeof subject === 'object') {
    const message = `Subject must either be an object or a function`
    throw new Error(message)
  }
}

export abstract class AbstractValidatable implements IValidatable {
  validatable: IValidatableRules = new ValidatableRules()
  validate(inputValue: string): IValidatableOutcome {
    const rules = this.validatable.getRules()
    const outcome = new ValidatableOutcome()
    for (const rule of rules) {
      outcome.addCheck(rule.check(inputValue))
    }
    return outcome
  }
}

/**
 * @public
 * @param {object} subject — An object we want to add validation system to
 * @description Curries an object/function with a "validatable" property containing ValidatableRules
 * and a "validate" function.
 *
 * CAUTION: This has been written back in 2013 and dearly needs refactoring.
 *
 * @example
 * import validatable from '@renoirb/validatable'
 *
 * // Notice this MUST either be a class, an object, or a Function, it cannot be an arrow function.
 * class UsernameValidator {
 *   constructor () {
 *     validatable(this)
 *     this.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/)
 *     this.validatable.addRule('billable_format', false, /^[ABGKNPQSTWXZ]{1}[0-9]{8}$/)
 *   }
 * }
 *
 * // ... later in the code
 *
 * const validator = new UsernameValidator();
 *
 * // With rules above, "jjjjjj" should fail because it has less than 9 characters
 * const check1 = validator.validate('jjjjjj')
 * check.hasPassed() // => false
 */
export const validatable = <T>(subject: T): void => {
  // @ts-ignore
  subject.validatable = new ValidatableRules()
  // @ts-ignore
  subject.validate = function validatableBoundValidator(
    inputValue: string,
  ): IValidatableOutcome {
    // @ts-ignore
    const rules = this.validatable.getRules()
    const outcome = new ValidatableOutcome()
    for (const rule of rules) {
      outcome.addCheck(rule.check(inputValue))
    }

    return outcome
  }.bind(subject)
}
