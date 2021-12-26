/**
 * Return a string representation of the unknown given error argument: returns the value of `error.message` if the given
 * argument is an instance of `Error` and has a truthy `message` property, otherwise returns `String(error)`.
 *
 * Intended for use within catch blocks and related error handling.
 *
 * Note that this project's `ValidationError` has a different implementation and its `message` may contain an array of strings.
 *
 * @param error unknown error
 */
export const getErrorMessage = (error: unknown) => {
  return (error instanceof Error && error.message) || String(error)
}

/**
 * Return the error `stack` property value if the given argument is an instance of `Error` (otherwise returns `undefined`).
 *
 * This helper function is intended for use with try/catch blocks and to support logging features where the type of a caught
 * error is of type `unknown`.
 *
 * @param error unknown error
 */
export const getErrorStack = (error: unknown) => {
  return (error instanceof Error && error.stack) || undefined
}
