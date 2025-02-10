/**
 * Assert that a value is not undefined. If it is, throw an error with the provided message.
 * @param value - Value to assert
 * @param message - Error message to throw if value is undefined
 * @param level - Level of error to throw ('error' or 'warn')
 */
export function assertValue<T>(
  value: T | undefined | null,
  message: string,
  level: 'error' | 'warn' = 'error'
): T {
  if (value === undefined || value === null) {
    if (level === 'error') {
      throw new Error(message)
    } else {
      console.warn(message)
    }
  }
  return value
}
