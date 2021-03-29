export function warn(condition: unknown, message: string): void {
  if (condition) {
    return
  }

  const text: string = `Warning: ${message}`

  // eslint-disable-next-line no-console
  console.warn(text)

  // Throwing an error and catching it immediately to improve debugging.
  // A consumer can use 'pause on caught exceptions'
  // https://github.com/facebook/react/issues/4216
  try {
    throw Error(text)
    // eslint-disable-next-line no-empty
  } catch (x) {}
}

export function debug(condition: unknown, message: string): asserts condition {
  if (import.meta.env.NODE_ENV === 'development') {
    warn(condition, message)
  }
}

export function fatal(message?: string): never {
  if (import.meta.env.NODE_ENV === 'production') {
    // In production we strip the message but still throw
    throw new Error('Invariant failed')
  } else {
    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*
    throw new Error(`Invariant failed: ${message || ''}`)
  }
}

// copied from tiny-invariant package
export function verify(
  condition: unknown,
  message?: string,
): asserts condition {
  if (!condition) {
    fatal(message)
  }
}

export function assert(
  condition: unknown,
  message?: string,
): asserts condition {
  if (import.meta.env.NODE_ENV === 'development') {
    verify(condition, message)
  }
}
