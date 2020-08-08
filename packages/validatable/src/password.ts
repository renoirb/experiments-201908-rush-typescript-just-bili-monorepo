import { validatable, AbstractValidatable } from './validatable'

export class PasswordValidator extends AbstractValidatable {
  constructor() {
    super()
    validatable(this)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
    this.validatable.addRule('mustBeLength', true, /^.{8,19}$/)
    this.validatable.addRule('mustContainCapitals', true, /[A-Z]/)
    this.validatable.addRule('mustContainDigits', true, /\d{1,}/)
    this.validatable.addRule(
      'mustContainSpecial',
      true,
      /[\u00C0-\u017F\s\u00C0-\u017F!@#$%?&*\(\)\[\]\{\}\-\+=:~]{1,}/,
    )
    this.validatable.addRule('mustNotRepeatCharacters', false, /(.)\1{2,}/)
  }
}
