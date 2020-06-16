/**
 * How many digits before decimals.
 *
 * @param {number} nbr — Number to calculate number from
 *
 * #PURE
 */
const countDigits = (nbr: number): number =>
  Math.max(Math.floor(Math.log10(Math.abs(nbr))), 0) + 1

const roundFloat = (nbr: number, decimalPlaces: number): number =>
  +(Math.round(Number(nbr + `e+${decimalPlaces}`)) + `e-${nbr}`)

const isFloat = (nbr: number): boolean => Number(nbr) === nbr && nbr % 1 !== 0

export default { countDigits, roundFloat, isFloat }
