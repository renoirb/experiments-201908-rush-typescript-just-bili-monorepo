const isObject = (obj: unknown): obj is object => {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 * Credits: Vue.js source
 * https://github.com/vuejs/vue/blob/2.6/dist/vue.runtime.esm.js
 */
export const isPlainObject = (obj: unknown): obj is object => {
  return (
    Object.prototype.toString.call(obj) === '[object Object]' && isObject(obj)
  )
}
