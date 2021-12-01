/**
 * Type Guard that confirms if the given argument is an array of strings.
 */
const isStringArray = (x: unknown): x is Array<string> => {
  if (!Array.isArray(x)) {
    return false
  }

  // apologies for the double negative - some() can be more efficient vs. every()
  return !x.some((i) => typeof i !== 'string')
}
