import { epoch } from '../decorators'
import { DateEpoch } from '../date-epoch'

const inputEpochInt = 1_592_971_200
const epochIntAsIsoString = '2020-06-24T04:00:00.000Z'
const epochAsString =
  'Wed Jun 24 2020 00:00:00 GMT-0400 (Eastern Daylight Time)'

class SomeClass {
  // Yeah, decorators would maybe add too much indirection
  // @epoch()
  public lastLogin = inputEpochInt
  // if we compare to ECMAScript getters, much clearer of the intent.
  // ... less "magic"
  get lastLoginEpoch(): DateEpoch {
    return new DateEpoch(this.lastLogin)
  }
  // #DecoratorAndStrictTypingMisdirection: Run-time Error, and no type-safety
  @epoch()
  public decoratedLastLogin = `${inputEpochInt}`
}

describe('decorators', () => {
  test('integration', () => {
    const subject = new SomeClass()
    expect(subject).toMatchObject({ lastLogin: inputEpochInt })
    expect(subject).toHaveProperty('lastLogin', inputEpochInt)
    expect(subject).toHaveProperty('lastLoginEpoch')
    expect(subject).toMatchSnapshot()
    expect(subject.lastLoginEpoch).toBeInstanceOf(DateEpoch)
    expect(String(subject.lastLoginEpoch.toDate())).toBe(epochAsString)
    expect(JSON.stringify(subject.lastLoginEpoch.toDate())).toMatch(
      epochIntAsIsoString,
    )
    expect(subject.lastLoginEpoch).toMatchObject(new DateEpoch(inputEpochInt))
    /**
     * When using decorator
     */
    expect(subject.decoratedLastLogin).toMatchObject(
      new DateEpoch(inputEpochInt),
    )
    expect(String(subject.decoratedLastLogin)).toBe(epochAsString)
    // Drawback of decorator is that it might hide the property from enumeration
    expect(subject).toHaveProperty('decoratedLastLogin')
    expect(subject).not.toMatchObject({
      lastLogin: inputEpochInt,
      decoratedLastLogin: inputEpochInt,
    })
  })
  test('When using decorator, we have no choice to extend toJSON', () => {
    class SomeExtendedClass extends SomeClass {
      toJSON() {
        return {
          lastLogin: this.lastLogin,
          decoratedLastLogin: +this.decoratedLastLogin, // rel=#DecoratorAndStrictTypingMisdirection
        }
      }
    }
    const subject = new SomeExtendedClass()
    /**
     * #DecoratorAndStrictTypingMisdirection
     *
     * Yes, decorators feels like it adds to confusion about
     * typings and how to add.
     * Although there is Reflect Metadata (not used here)
     * it is still too early to properly have Type Safety with
     * decorators
     *
     * TODO: See if and how to avoid such things.
     */
    expect(JSON.parse(JSON.stringify(subject))).toMatchObject({
      lastLogin: inputEpochInt,
      decoratedLastLogin: inputEpochInt * 1000,
    })
  })
})
