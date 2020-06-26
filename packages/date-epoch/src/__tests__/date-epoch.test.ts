/* eslint-env jest */

import { advanceTo } from 'jest-date-mock'

import { DateEpoch } from '../date-epoch'

const epochInt = 1_592_971_200
const epochIntAsDashLessIsoishString = '20200624T040000.000Z'
const epochIntAsIsoString = '2020-06-24T04:00:00.000Z'
const epochAsString =
  'Wed Jun 24 2020 00:00:00 GMT-0400 (Eastern Daylight Time)'

describe('DateEpoch', () => {
  beforeEach(() => {
    advanceTo(new Date(epochIntAsIsoString))
  })

  test('DateEpoch#constructor when argument is a number', () => {
    const subject = new DateEpoch(epochInt)
    expect(+subject).toBe(epochInt * 1000)
  })

  test('DateEpoch#constructor when argument is string of a number', () => {
    const subject = new DateEpoch(`${epochInt}`)
    expect(+subject).toBe(epochInt * 1000)
    expect(Number(subject)).toBe(epochInt * 1000)
    expect(+subject).not.toBe(epochInt)
  })

  test('DateEpoch#constructor when argument is string yyyyMMddtHHmmss', () => {
    const subject = new DateEpoch(epochIntAsDashLessIsoishString)
    expect(String(new Date(epochIntAsIsoString))).toBe(epochAsString)
    expect(String(subject.toDate())).toBe(epochAsString)
    expect(subject.toDate().toUTCString()).toBe('Wed, 24 Jun 2020 04:00:00 GMT')
  })

  test('DateEpoch#constructor when argument is a Date', () => {
    const subject = new DateEpoch(Date.now())
    expect(+subject).toBe(epochInt * 1000)
    expect(+subject).not.toBe(epochInt)
    expect(Date.now()).toMatchSnapshot()
    expect(subject.toDate()).toMatchSnapshot()
    expect(+subject.toDate()).toEqual(+Date.now())
  })

  test('DateEpoch#constructor when empty use same as Date.now()', () => {
    const subject = new DateEpoch()
    expect(+subject).toBe(epochInt * 1000)
  })

  it('Has well-known DateEpoch[Symbol.toStringTag]()', () => {
    expect(Object.prototype.toString.call(new DateEpoch())).toBe(
      '[object DateEpoch]',
    )
  })

  it('Is like an empty object', () => {
    const subject = new DateEpoch(`${epochInt}`)
    expect(subject).toMatchObject({})
    expect(JSON.stringify(subject)).toBe('{}')
    expect(JSON.stringify(subject)).toBe(JSON.stringify({}))
  })

  it('Coerces to number', () => {
    const subject = new DateEpoch(epochInt)
    expect(Number(subject)).toEqual(epochInt * 1000)
    expect(+subject).toBe(epochInt * 1000)
  })

  it('Coerces like a Date object', () => {
    const subject = new DateEpoch(epochInt)
    expect(String(subject)).toBe(epochAsString)
    expect(String(new Date(epochIntAsIsoString))).toBe(epochAsString)
    expect(subject.toDate().toISOString()).toBe(epochIntAsIsoString)
  })
})
