/* tslint:disable:no-any no-unsave-any no-restricted-globals typedef no-console */

/**
 * Create cached version of a pure function
 *
 * https://github.com/vuejs/vue/blob/2.6/dist/vue.runtime.esm.js#L150
 *
 * https://egghead.io/lessons/typescript-overload-a-function-with-typescript-s-overload-signatures
 * https://justinnoel.dev/2018/10/21/understanding-lodash-memoize/
 *
 * @param {Function} fn
 */
// @ts-ignore
export function cached(fn: any) {
  const cache = Object.create(null);
  return function cachedFn(str: number | string) {
    const hit = cache[str];
    return hit || (cache[str] = fn.call(null, str));
  };
}

// @ts-ignore
export const log = (...args) => {
  // @ts-ignore
  const hasEnv = 'env' in (process || {});
  // @ts-ignore
  if (hasEnv && 'DEBUG' in process.env && process.env.DEBUG.length > 0) {
    console.log(...args);
  }
};
