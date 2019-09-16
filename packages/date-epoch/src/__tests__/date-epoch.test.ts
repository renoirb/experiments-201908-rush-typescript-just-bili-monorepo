/* eslint-env jest */

import { DateEpoch } from '..'

describe('DateEpoch', () => {
  const inputEpochInt = 1533762055251
  const expectEpochIntToISOString = '2018-08-08T21:00:55.251Z'
  test('DateEpoch#constructor', () => {
    const subject = new DateEpoch(inputEpochInt)
    expect(JSON.stringify(subject)).toBe(
      JSON.stringify({ epoch: inputEpochInt }),
    )
    expect(JSON.parse(JSON.stringify(subject))).toMatchObject({
      epoch: inputEpochInt,
    })
    expect(String(subject)).toEqual(inputEpochInt.toString())
    expect(subject.toDate().toISOString()).toEqual(expectEpochIntToISOString)
    expect(JSON.stringify(subject)).toMatchSnapshot()
  })

  test('DateEpoch#constructor when empty', () => {
    const subject = new DateEpoch()
    expect(subject.epoch).toBeGreaterThan(inputEpochInt)
  })

  test('DateEpoch#toString', () => {
    const epoch = 1533762055251
    const subject = new DateEpoch(epoch)
    const stringified = String(subject)
    expect(stringified).toBe(String(epoch))
  })
})
