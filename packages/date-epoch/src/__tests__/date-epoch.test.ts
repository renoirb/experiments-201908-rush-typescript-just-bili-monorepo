/* eslint-env jest */

import { DateEpoch } from '../date-epoch'

describe('DateEpoch', () => {
  const inputEpochInt = 1533762055251
  const expectEpochIntToISOString = '2018-08-08T21:00:55.251Z'
  test('DateEpoch#constructor', () => {
    const subject = new DateEpoch(inputEpochInt)
    expect(JSON.parse(JSON.stringify(subject))).toBe(inputEpochInt)
    expect(String(subject)).toEqual(inputEpochInt.toString())
    expect(subject.toDate().toISOString()).toEqual(expectEpochIntToISOString)
    expect(JSON.stringify(subject)).toMatchSnapshot()
  })

  test('DateEpoch#constructor when empty', () => {
    const subject = new DateEpoch()
    expect(+subject).toBeGreaterThan(inputEpochInt)
  })

  test('DateEpoch#toString', () => {
    const epoch = 1533762055251
    const subject = new DateEpoch(epoch)
    const stringified = String(subject)
    expect(stringified).toBe(String(epoch))
  })
})
