import { validatable } from './validatable'

export class PasswordValidator {
  constructor() {
    validatable(this)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
    this.validatable.addRule('lbl_PasswordMustLength', true, /^.{8,19}$/)
    this.validatable.addRule('lbl_PasswordMustContainCapitals', true, /[A-Z]/)
    this.validatable.addRule('lbl_PasswordMustContainDigits', true, /\d{1,}/)
    this.validatable.addRule(
      'lbl_PasswordMustContainSpecial',
      true,
      /[\u00C0-\u017F\s\u00C0-\u017F!@#$%?&*\(\)\[\]\{\}\-\+=:~]{1,}/,
    )
    this.validatable.addRule(
      'lbl_PasswordMustNotRepeatCharacters',
      false,
      /(.)\1{2,}/,
    )
  }
}
