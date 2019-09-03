/* eslint-env jest */
/* global describe,beforeAll,afterAll,beforeEach,afterEach,test,expect */

import {
  validatable,
  ValidatableRules,
  ValidatableOutcome,
} from '../validatable';

/**
 * An example typical validation class.
 * Let's imagine we want to make sure a user's username match specific rules.
 *
 * e.g.
 * - between 8 and 19 characters
 * - Must not look like a bill number (e.g. A00000000)
 * - ...
 */
class UsernameValidator {
  constructor() {
    validatable(this);
    this.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/);
    this.validatable.addRule(
      'billable_format',
      false,
      /^[ABGKNPQSTWXZ]{1}[0-9]{8}$/,
    );
  }
}

describe('validatable Use-Case for validating if a username matches business rules', () => {
  test('Snapshot peek', () => {
    const validator = new UsernameValidator();
    expect(validator).toMatchSnapshot();
    expect(validator).toHaveProperty('validatable'); // Has a ValidatableRules object
    expect(validator.validatable).toBeInstanceOf(ValidatableRules);
    expect(validator).toHaveProperty('validate'); // Has added a "validate" function
  });

  test('Snapshot peek to ValidatableOutcome', () => {
    const validator = new UsernameValidator();
    // And one last attempt, for Snapshot peeking
    const outcome = validator.validate('jameskirk');
    expect(outcome).toMatchSnapshot();
    expect(outcome).toBeInstanceOf(ValidatableOutcome);
    expect(outcome).toHaveProperty('failures', []);
    expect(outcome.hasPassed()).toBe(true);
  });

  /**
   * This might need refactoring.
   * Tests here seems to be run with Jasmine instead of Jest.
   * That'll do for now.
   * Refer to PasswordValidator for a more recent validator sample.
   */
  const subject = new UsernameValidator();
  const runs = [];
  runs.push([
    'J5555555',
    true,
    'Billable account format lookalike, but not using expected first caracter',
  ]);
  runs.push(['jjjjjj', false, 'Less than 9']);
  runs.push(['jjjjjjjjj', true, 'Only letters']);
  runs.push(['jjj2jjjjj', true, 'Letters and 1 number']);
  runs.push(['jJJJ4__jii', true, 'Upper, lower and allowed special']);
  runs.push(['jJJJ4<jii', false, 'Upper, lower and non allowed special']);
  runs.push(['jjjJJ J4jj', false, 'Upper, lower, special and a space']);
  runs.push(['W55555555', false, 'Billable account format']);
  runs.push([
    'J55555555',
    true,
    'Billable account format lookalike, but not using expected first caracter',
  ]);
  for (const run of runs) {
    const check = subject.validate(run[0]);
    const message = `String ${
      run[0]
    } should be ${run[1].toString()}, because; ${run[2]}`;
    it(message, () => {
      expect(check.hasPassed()).toBe(run[1]);
    });
  }
});
