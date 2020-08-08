// @ts-ignore
export const log = (...args) => {
  // @ts-ignore
  const hasEnv = 'env' in (process || {})
  // @ts-ignore
  if (hasEnv && 'DEBUG' in process.env && process.env.DEBUG.length > 0) {
    console.log(...args)
  }
}
