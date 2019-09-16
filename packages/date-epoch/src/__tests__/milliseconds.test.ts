/* eslint-env jest */

import { milliseconds, seconds } from '..'

describe('milliseconds', () => {
  const inputEpochInt = 1533762055251
  test('Scenario: 1 A valid epoch number should not be modified', () => {
    const subject = milliseconds(inputEpochInt)
    expect(subject).toBe(inputEpochInt)
  })

  test('Scenario: 2 Make Seconds into Milliseconds', () => {
    const s = 1541168349
    const subject = milliseconds(s)
    expect(subject).toBe(s * 1000)
  })

  test('Scenario: 3 Makce Milliseconds into Seconds', () => {
    const ms = 1533762055251
    const s = 1533762055
    const subject = seconds(ms)
    expect(subject).toBe(s)
  })
})
