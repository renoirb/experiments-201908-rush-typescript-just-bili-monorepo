import numbers from './numbers'

/**
 * Date Range
 *
 * Two UNIX Epoch numbers.
 *
 * Positions:
 * - begin
 * - end
 */
export type DateRangeTuple = [number, number]

export type FuzzyDateType = number | string | Date

/**
 * Calculate current timestamp.
 * Useful for internal computations.
 */
export const timestamp = (): number => new Date().getTime() // Always UTC!

export const convertMillisecondsToSeconds = (ms: number): number =>
  Math.floor(ms / 1000)

export const isMilliseconds = (nbr: number): boolean =>
  numbers.countDigits(nbr) === 13

export const isSeconds = (nbr: number): boolean =>
  numbers.countDigits(nbr) === 10

/**
 * Ensure we get milliseconds out of some UNIX Epoch.
 *
 * If an UNIX Epoch is already in milliseconds return the same value;
 * If an UNIX Epoch is close enough, and within hoursTreshold limit, multiply by 1000.
 *
 * #PURE
 */
export const coerceMilliseconds = (
  maybeMilliseconds: number | string,
  hoursTreshold = 25,
): number => {
  let value = +maybeMilliseconds
  if (Number.isNaN(value)) {
    const message = `Invalid argument "${value}", must be a number, or a string containing a number`
    throw new Error(message)
  }
  const isValueSeconds = isSeconds(value)
  // If the `value` is hoursTreshold hours (e.g. 25) or less, adjust the time to miliseconds
  // Otherwise let's not touch it
  if (isValueSeconds) {
    const now = timestamp()
    const secs = convertMillisecondsToSeconds(now)
    const durationInSeconds = Math.floor(value - secs)
    const hours = Math.floor(durationInSeconds / 3600)
    if (hours < hoursTreshold) {
      value *= 1000
    }
  }

  return value
}

export const coerceSeconds = (maybeMilliseconds: number | string): number => {
  let value: number = +maybeMilliseconds
  if (Number.isNaN(value)) {
    const message = `Invalid argument "${value}", must be a number, or a string containing a number`
    throw new Error(message)
  }
  if (isMilliseconds(value)) {
    // const sliced = String(value).slice(0, -3)
    // value = parseInt(sliced, 10)
    value = Math.floor(value / 1000)
  }

  return value
}

/**
 * Coerce yyyymmddTHHMMSS.SSSZ (ISO 8601 standard) notation into UNIX Epoch.
 *
 * Take the following string;
 *
 * input: "20171117171040.000Z"
 * output: 1510956640000
 */
export const coerceIso8601DashLessNotation = (
  maybeDateString: string,
): number | null => {
  let out: number | null = null
  const dto = maybeDateString
  const isString = typeof maybeDateString === 'string'
  const assertions = [
    /\.\d{3}Z/ /* MUST end by dot 000Z where 0 can be any 0-9 digit */,
    /^(18|19|20)\d{12}/,
  ].map((r) => r.test(dto))

  let hopefullyStringWillBeParsable = ''
  /* Convert number to at least 2 digits number string */
  const s = (n: number): string => String(n).padStart(2, '0')
  if (assertions.includes(false) === false && isString) {
    const yyyy = Number(dto.substr(0, 4))
    const mm = Number(dto.substr(4, 2))
    const dd = Number(dto.substr(6, 2))
    const hh = Number(dto.substr(8, 2))
    const mn = Number(dto.substr(10, 2))
    const ss = Number(dto.substr(12, 2))
    // Assuming new Date(...) is ALWAYS UTC, since we validated it ends by .000Z
    // it should be fine. Because UTC and .000Z are synomyms.
    hopefullyStringWillBeParsable = `${yyyy}-${s(mm)}-${s(dd)}T${s(hh)}:${s(
      mn,
    )}:${s(ss)}`
    const attempt = new Date(hopefullyStringWillBeParsable)
    const maybeNumber = +attempt
    if (Number.isNaN(maybeNumber) === false) {
      out = maybeNumber
    }
  }

  return out
}

/**
 * From a number of milliseconds, how many
 * days does it spans?
 *
 * @param {number} ms — Milliseconds
 */
export const calculateDays = (ms: number): number => ms / 86400 / 1000

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

/*
 * See @renoirb/webapi-utils
 * in mustHaveDateUrlQueryParam middleware.
 */
export const getDaysAgoMillisecondsAsTuple = (days = 1): DateRangeTuple => {
  const endTime = timestamp()
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
 * @param {number} epoch - A number representation of an UNIX Epoch timestamp
 */
export const toDate = (epoch: number): Date => {
  const ensureMillisecondsInt = coerceMilliseconds(epoch)
  return new Date(ensureMillisecondsInt)
}

/**
 * Check if runtime has ECMASCript Intl extension installed.
 */
export const hasIntl = (): boolean => {
  let supported = false
  try {
    const someDateInJanuary = new Date(
      9e8 /* some number that happens to be in january */,
    )
    const formatter = new Intl.DateTimeFormat('fr-CA', { month: 'long' })
    const formatted = formatter.format(someDateInJanuary)
    supported = 'janvier' === formatted
  } catch (e) {
    // Silence is golden
  }
  return supported
}

export default {
  calculateDays,
  hasIntl,
  coerceIso8601DashLessNotation,
  coerceMilliseconds,
  coerceSeconds,
  getDeltaDaysAgoFromNowUtcMilliseconds,
  isMilliseconds,
  isSeconds,
  timestamp,
  toDate,
}
