/* eslint-env jest */
/* global describe,beforeAll,afterAll,beforeEach,afterEach,test,expect */

import { validatable, ValidatableRules } from '../validatable';

const injectValidatableTo = subject => {
  validatable(subject);
  subject.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/);

  return subject;
};

describe('validatable', () => {
  test('Component should exist', () => {
    expect(validatable).toBeDefined();
  });

  test('Snapshot peek', () => {
    // Use simplest Object
    const alpha = {};
    validatable(alpha);
    alpha.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/);
    expect(alpha.validatable).toMatchSnapshot();
    expect([...alpha.validatable.rules]).toMatchSnapshot();
  });

  // Almost everything is an object, let's stretch a bit.
  test('Using other types of JavaScript objects, forms', () => {
    const bravo = injectValidatableTo(Object.create(null));
    expect(bravo.validatable).toMatchSnapshot();

    const charlie = injectValidatableTo(function OriginalJavaScriptConstructor(
      foo,
    ) {
      this.foo = foo || 'Foo default value';
    });
    expect(charlie.validatable).toMatchSnapshot();

    const delta = injectValidatableTo([]);
    expect(delta.validatable).toMatchSnapshot();
  });
});
