/**
 * Type Guard that confirms if the given argument is an `Error` that includes the string property `code`.
 *
 * Such errors are thrown by NodeJS functions (e.g. `NodeJS.ErrnoException`) as well as the node-postgres driver
 * used by TypeORM to interface with the app database.
 *
 * @see PostgresErrorCode
 * @link https://www.postgresql.org/docs/13/errcodes-appendix.html
 */
export const isErrorWithCode = <T extends Error>(x: unknown): x is T & { code: string } => {
  return (
    typeof x === 'object' && x !== null && 'code' in x && typeof (x as any)['code'] === 'string' && x instanceof Error
  )
}
