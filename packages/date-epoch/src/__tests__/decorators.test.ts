// import { epoch } from '../decorators'
import { DateEpoch } from '../date-epoch'

const inputEpochInt = 1_533_762_055_251
const expectEpochIntToISOString = '2018-08-08T21:00:55.251Z'
const expectEpochDateAsSTring =
  'Wed Aug 08 2018 17:00:55 GMT-0400 (Eastern Daylight Time)'

class SomeClass {
  // Yeah, decorators would maybe add too much indirection
  // @epoch
  public lastLogin = inputEpochInt
  // if we compare to ECMAScript getters, much clearer of the intent.
  // ... less "magic"
  get lastLoginEpoch(): DateEpoch {
    return new DateEpoch(this.lastLogin)
  }
}

describe('decorators', () => {
  test('integration', () => {
    const subject = new SomeClass()
    expect(subject).toMatchObject({ lastLogin: inputEpochInt })
    expect(subject).toHaveProperty('lastLogin', inputEpochInt)
    expect(subject).toHaveProperty('lastLoginEpoch')
    expect(subject).toMatchSnapshot()
    expect(subject.lastLoginEpoch).toBeInstanceOf(DateEpoch)
    expect(String(subject.lastLoginEpoch.toDate())).toBe(
      expectEpochDateAsSTring,
    )
    expect(JSON.stringify(subject.lastLoginEpoch.toDate())).toMatch(
      expectEpochIntToISOString,
    )
    expect(subject.lastLoginEpoch).toMatchObject(new DateEpoch(inputEpochInt))
  })
})
