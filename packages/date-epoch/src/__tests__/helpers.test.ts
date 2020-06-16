/* eslint-env jest */

import helpers from '../helpers'

describe('coerceMilliseconds', () => {
  const inputEpochInt = 1_533_762_055_251
  test('Scenario: 1 A valid epoch number should not be modified', () => {
    const subject = helpers.coerceMilliseconds(inputEpochInt)
    expect(subject).toBe(inputEpochInt)
  })
  test('Scenario: 2 Make Seconds into Milliseconds', () => {
    const s = 1_592_428_241
    const subject = helpers.coerceMilliseconds(s)
    expect(subject).toBe(s * 1000)
  })
})

describe('coerceMilliseconds', () => {
  test('Scenario: 3 Makce Milliseconds into Seconds', () => {
    const ms = 1_592_428_241_000
    const s = 1_592_428_241
    const subject = helpers.coerceSeconds(ms)
    expect(subject).toBe(s)
  })
})

describe('coerceIso8601DashLessNotation', () => {
  test('happy path', () => {
    const input = '20200617171041.000Z'
    const expected = 1_592_428_241_000
    const subject = helpers.coerceIso8601DashLessNotation(input)
    expect(subject).toBe(expected)
  })
})
