export type BiliInputConfigEntryObject = Record<string | 'index', string>

const isObject = (obj: unknown): obj is object => {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 * Credits: Vue.js source
 * https://github.com/vuejs/vue/blob/2.6/dist/vue.runtime.esm.js
 */
const isPlainObject = (obj: unknown): obj is object => {
  return (
    Object.prototype.toString.call(obj) === '[object Object]' && isObject(obj)
  )
}

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

export const input = (
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
