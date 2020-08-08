// @ts-nocheck

import { PasswordValidator } from '../password'
import { ValidatableRules } from '../validatable'

describe('Sanity checks', () => {
  test('Subject that has been curried has validatable object', () => {
    const subject = new PasswordValidator()
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty('validatable')
    expect(subject.validatable).toBeInstanceOf(ValidatableRules)
    expect(subject).toHaveProperty('validate')
  })
})

describe('PasswordValidator rules dry-run', () => {
  const subject = new PasswordValidator()
  const runs = []

  const ek = [
    /* 0 */ 'mustBeLength',
    /* 1 */ 'mustContainCapitals',
    /* 2 */ 'mustContainDigits',
    /* 3 */ 'mustContainSpecial',
    /* 4 */ 'mustNotRepeatCharacters',
  ]

  runs.push(['jjjjjjj', false, 'case 1: Less than minimum length', [...ek]])
  runs.push([
    'jjjjjjjj',
    false,
    'case 2: Only minimum length',
    [ek[1], ek[2], ek[3], ek[4]],
  ])
  runs.push([
    'j1jjjjjj',
    false,
    'case 3: Minimum length, one digit, yet insufficient',
    [ek[1], ek[3], ek[4]],
  ])
  runs.push([
    'j1jj%jjj',
    false,
    'case 4: Minimum length, one digit, one special, yet insufficient',
    [ek[1], ek[4]],
  ])
  runs.push(['j1Jj%jjj', false, 'case 5: Repetition', [ek[4]]])
  runs.push([
    'j1Jj!!!-',
    false,
    'case 5: Repetition even when special',
    [ek[4]],
  ])
  runs.push(['j1Jj%jjT', true, 'case 6: All requirements met', []])

  runs.push(['@CSIs33lf@!!', true, 'case 6: All requirements edge-case', []])

  // Known edge-case, unicode characters might pass if repeated
  // runs.push(['j1Jj😺😺😺-', false, 'case 7: Repetition even when special', [ek[4]]])

  for (const [
    password,
    expectedBoolean,
    exampleSummary,
    expectedFailureKeys,
  ] of runs) {
    const check = subject.validate(password)
    const failures = check.getFailureKeys().sort()
    const expectedFailureCodes = expectedFailureKeys.sort()
    const expectedLength = expectedFailureCodes.length
    const expectedCodesStr = expectedFailureCodes.join(',')
    const testExpectedErrorCodes = `${exampleSummary}: "${password}",  expected ${expectedLength} failures, error codes should be [${expectedCodesStr}], but we got [${failures.join(
      ',',
    )}] }`
    it(testExpectedErrorCodes, () => {
      expect(failures).toEqual(expect.arrayContaining(expectedFailureCodes))
      expect(failures).toHaveLength(expectedLength)
    })
    const testSummaryExplanation = `${exampleSummary}: "${password}",  should be ${expectedBoolean.toString()}`
    it(testSummaryExplanation, () => {
      expect(check.hasPassed()).toBe(expectedBoolean)
    })
  }
})
