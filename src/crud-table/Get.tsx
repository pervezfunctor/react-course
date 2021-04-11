import { string, UnknownRecord } from 'io-ts'
import React from 'react'
import { useGet } from './useGet'

// tslint:disable readonly-array no-unbound-method
export interface GetProps<T extends {}, P extends readonly any[]> {
  readonly deps?: P | readonly []
  readonly component?: React.FC<{ readonly data: T; fetchAgain?(): void }>
  // You should pass a global function, not a closure. Pass all deps to 'deps' instead.
  asyncFn(...params: P): Promise<T>
  children?(data: T, fetchAgain: () => void): JSX.Element
}

export interface ErrorViewProps {
  readonly error: Error | string
}

const ErrorView: React.FC<ErrorViewProps> = ({ error }) => (
  <div>
    {string.is(error) ? (
      error
    ) : UnknownRecord.is(error) ? (
      error.message ? (
        error.message
      ) : (
        <pre>JSON.stringify(error, null, 2)</pre>
      )
    ) : (
      'error'
    )}
  </div>
)

const Spinner: React.FC = () => <div>Loading...</div>

export function Get<T extends {}, P extends readonly any[]>({
  asyncFn,
  deps = [],
  component: Component,
  children,
}: GetProps<T, P>): JSX.Element {
  const result = useGet(asyncFn, ...(deps as P))

  if (result.state === 'failure') {
    return <ErrorView error={result.error} />
  }

  if (result.state === 'success') {
    if (Component) {
      return <Component data={result.data} fetchAgain={result.refresh} />
    }
    if (children) {
      return children(result.data, result.refresh)
    }
    throw new Error('component or children must be provided to Get')
  }

  return <Spinner />
}
