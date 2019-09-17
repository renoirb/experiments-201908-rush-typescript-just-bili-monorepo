/**
 * Ensure we get milliseconds out of some UNIX Epoch.
 *
 * Copied from @Unify360/ui, in src/utils/time.js
 *
 * If an UNIX Epoch is already in milliseconds return the same value;
 * If an UNIX Epoch is close enough, and within hoursTreshold limit, multiply by 1000.
 */
export const milliseconds = (
  maybeMilliseconds = 0,
  hoursTreshold = 25,
): number => {
  const ms = new Date().getTime()
  // const millisecondsDigitCount = ((ms).toString()).length
  const secs = Math.floor(ms / 1000)
  const secondsDigitCount = secs.toString().length
  const isExpressedInSeconds =
    maybeMilliseconds.toString().length === secondsDigitCount
  // const isExpressedInMilliSeconds = ((maybeMilliseconds).toString()).length === millisecondsDigitCount
  // If the maybeMilliseconds is hoursTreshold hours (e.g. 25) or less, adjust the time to miliseconds
  // Otherwise let's not touch it
  if (isExpressedInSeconds) {
    const durationInSeconds = Math.floor(maybeMilliseconds - secs)
    const hours = Math.floor(durationInSeconds / 3600)
    if (hours < hoursTreshold) {
      /* tslint:disable-next-line:no-parameter-reassignment */
      maybeMilliseconds *= 1000
    }
  }

  return maybeMilliseconds
}

export const seconds = (maybeMilliseconds = 0): number => {
  const millisecondsLen = String(+new Date()).length
  const argCharLen = String(maybeMilliseconds).length
  const argIsMilliseconds = millisecondsLen === argCharLen
  let out = maybeMilliseconds
  if (argIsMilliseconds) {
    // const sliced = String(maybeMilliseconds).slice(0, -3)
    // out = parseInt(sliced, 10)
    out = Math.floor(out / 1000)
  }

  return out
}

export const getMillisecondsToDaysAgo = (ms = 1000): number => ms / 86400 / 1000

/**
 * @param {number} days - Number of days ago
 */
export const getDaysAgoToMilliseconds = (days = 1): number =>
  days * 1000 * 86400

export const getTimeDaysAgoMilliseconds = (
  endTimeMilliseconds: number,
  days = 1,
): number => {
  const begin = getDaysAgoToMilliseconds(days)
  return endTimeMilliseconds - begin
}

export const getTimeNowUtcMillliseconds = (): number => new Date().getTime() // Always UTC!

/*
 * See @renoirb/webapi-utils
 * in mustHaveDateUrlQueryParam middleware.
 */
export const getDaysAgoMillisecondsAsTuple = (days = 1): [number, number] => {
  const endTime = getTimeNowUtcMillliseconds()
  const startTime = getTimeDaysAgoMilliseconds(endTime, days)

  return [startTime, endTime]
}

export const getDeltaDaysAgoFromNowUtcMilliseconds = (days = 1): number => {
  const [startTime, endTime] = getDaysAgoMillisecondsAsTuple(days)
  return endTime - startTime
}

/**
 * Convert UNIX Epoch Number into a native Date object.
 *
 * @param epoch - A number representation of an UNIX Epoch timestamp
 */
export const getDateFromEpoch = (epoch = 1539112235): Date => {
  const ensureMillisecondsInt = milliseconds(epoch)
  return new Date(ensureMillisecondsInt)
}
