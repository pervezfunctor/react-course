import { Either, isRight } from 'fp-ts/lib/Either'
import { Errors, literal, string, Type } from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { assert, fatal } from './assertions'

export function cast<A, O, I>(spec: Type<A, O, I>, args: I): A {
  const decoded: Either<Errors, A> = spec.decode(args)
  if (isRight(decoded)) {
    return decoded.right
  }

  fatal(PathReporter.report(decoded).join('\n'))
}

export function assertCast<A, O, I>(spec: Type<A, O, I>, args: I): A {
  const decoded: Either<Errors, A> = spec.decode(args)
  assert(spec.is(args), PathReporter.report(decoded).join('\n'))
  return isRight(decoded) ? decoded.right : args
}

export async function rejected<T>(
  decoded: Either<Errors, T> | string,
): Promise<T> {
  return Promise.reject(
    new Error(
      string.is(decoded) ? decoded : PathReporter.report(decoded).join('\n'),
    ),
  )
}

export async function toPromise<T>(either: Either<Errors, T>): Promise<T> {
  return isRight(either) ? either.right : rejected(either)
}

export const lit: typeof literal = literal
