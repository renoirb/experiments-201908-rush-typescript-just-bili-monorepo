// @ts-nocheck
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { validatable } from '../validatable'

const injectValidatableTo = (subject) => {
  validatable(subject)
  subject.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/)

  return subject
}

describe('validatable', () => {
  test('Component should exist', () => {
    expect(validatable).toBeDefined()
  })

  test('Snapshot peek', () => {
    // Use simplest Object
    const alpha = {}
    validatable(alpha)
    alpha.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/)
    expect(alpha.validatable).toMatchSnapshot()
    expect([...alpha.validatable.rules]).toMatchSnapshot()
  })

  // Almost everything is an object, let's stretch a bit.
  test('Using other types of JavaScript objects, forms', () => {
    // eslint-disable-next-line @rushstack/no-null
    const bravo = injectValidatableTo(Object.create(null))
    expect(bravo.validatable).toMatchSnapshot()

    const charlie = injectValidatableTo(function OriginalJavaScriptConstructor(
      foo,
    ) {
      this.foo = foo || 'Foo default value'
    })
    expect(charlie.validatable).toMatchSnapshot()

    const delta = injectValidatableTo([])
    expect(delta.validatable).toMatchSnapshot()
  })
})
