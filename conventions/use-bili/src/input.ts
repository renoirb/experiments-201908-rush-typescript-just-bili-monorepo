import type { BiliInputConfigEntryObject } from './types'
import { isPlainObject } from './utils'

const validateConfigEntryObject = (
  input: unknown,
): input is BiliInputConfigEntryObject => {
  const inputArgIsValid = isPlainObject(input)
  if (inputArgIsValid === false) {
    const message = `Unexpected input, it must be a Record<string, string> object hash-map.`
    throw new Error(message)
  }
  const keys = Object.getOwnPropertyNames(input)
  const indexKeyName = keys.some((k) => /^index$/.test(k))
  const hasIndex = keys.includes('index') && indexKeyName
  if (hasIndex === false) {
    const keyNames = keys.join(', ')
    const message = `Unexpected input, among the entries, there must be an entry with the name "index". We have: ${keyNames}.`
    throw new Error(message)
  }

  return hasIndex
}

export default (
  input:
    | string
    | BiliInputConfigEntryObject
    | (BiliInputConfigEntryObject | string)[],
): BiliInputConfigEntryObject => {
  // eslint-disable-next-line @rushstack/no-null
  const out = Object.create(null)

  if (typeof input === 'string') {
    out.index = input
  }
  if (isPlainObject(input)) {
    Object.assign(out, { ...input })
  }

  return validateConfigEntryObject(out) ? out : {}
}
