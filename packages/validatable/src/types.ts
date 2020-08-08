/**
 * Make an object or function with a validation capabilities
 */
export interface IValidatable {
  validatable: IValidatableRules
  validate: (inputValue: string) => IValidatableOutcome
}

export interface ICheckOutcome {
  outcome: boolean
  value: string
  key: string
  expectation: boolean
}

/**
 * @public
 * @description Outcome of "validate" function we curried
 *
 * @example
 * import { default as validatable, ValidatableOutcome } from '@renoirb/validatable'
 *
 * class UsernameValidator {
 *   constructor () {
 *     validatable(this)
 *     this.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/)
 *     this.validatable.addRule('billable_format', false, /^[ABGKNPQSTWXZ]{1}[0-9]{8}$/)
 *   }
 *   validate (inputValue) {
 *     // NOTICE: This is how it is done via validatable curries
 *     // Replace "validate" function, if you need to have other checks than
 *     // only using RegExes
 *     const rules = this.validatable.getRules()
 *     const outcome = new ValidatableOutcome()
 *     for (const rule of rules) {
 *       outcome.addCheck(rule.check(inputValue))
 *     }
 *     return outcome
 *   }
 * }
 */
export interface IValidatableOutcome {
  passes: ICheckOutcome[]
  failures: ICheckOutcome[]
  hasPassed(): boolean
  getFailures(): ICheckOutcome[]
  addCheck(check: ICheckOutcome): void
  getFailureKeys(): string[]
}

/**
 * @public
 * @description A validation Rule, automatically added via ValidatableRules
 */
export interface IRule {
  readonly key: string
  readonly expectation: boolean
  readonly pattern: RegExp
  check(value: string): ICheckOutcome
}

/**
 * @public
 * @description Add and Get validation rules
 *
 * @example
 * import validatable from '@renoirb/validatable'
 *
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
 * validator.rules // => [Rule]
 */
export interface IValidatableRules {
  rules: IRule[]
  addRule(key: string, expectation: boolean, pattern: RegExp): void
  getRules(): IRule[]
}
