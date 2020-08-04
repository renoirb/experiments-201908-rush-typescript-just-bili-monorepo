# Validatable

Curries an object/function with a "validatable" property containing
ValidatableRules and a "validate" function.

CAUTION: This has been written back in 2013 and dearly needs refactoring.

```js
import validatable from './validatable'

// Notice this MUST either be a class, an object, or a Function, it cannot be an arrow function.
class UsernameValidator {
  constructor() {
    validatable(this)
    this.validatable.addRule('size', true, /^[0-9a-zA-z\-_]{8,19}$/)
    this.validatable.addRule(
      'billable_format',
      false,
      /^[ABGKNPQSTWXZ]{1}[0-9]{8}$/,
    )
  }
}

// ... later in the code

const validator = new UsernameValidator()

// With rules above, "jjjjjj" should fail because it has less than 9 characters
const check1 = validator.validate('jjjjjj')
check.hasPassed() // => false
```

---

## Context

In this package, we've migrated ECMAScript from
**@bit/renoirb.curries.curries.validatable**, and copied it here. We could have
had
[written the code here and exported it in isolation to bit](https://docs.bitsrc.io/docs/isolating-and-tracking-components.html).
That could be done. But it isn't, it's also copied over to
[GitHub.com/renoirb/bits **curries/**](https://github.com/renoirb/bits/tree/master/src/curries).
The use-case here was to migrate ECMAScript with modules, managed by TypeScript,
without being converted to it just yet. We also wanted to have Jest test to
work.

## Next Steps

### Migrate to TypeScript?

Assuming we want to rework that package, we could
[migrate it to TypeScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
