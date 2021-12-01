/**
 * Type Guard that confirms if the given argument is an array of numbers.
 */
const isNumberArray = (value: unknown): value is Array<number> => {
  if (!Array.isArray(value)) {
    return false
  }

  // apologies for the double negative - some() can be more efficient vs. every()
  return !value.some((v) => typeof v !== 'number')
}
