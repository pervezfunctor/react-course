import { boolean, Int, number, readonlyArray, string, tuple } from 'io-ts'
import { cast, checked, enums, obj } from './safe'

const num = cast(number, 10.5)
const str = cast(string, 'hello')
const bool = cast(boolean, false)
const Color = enums('Color', 'red', 'green', 'blue')
const color = cast(Color, 'red')
const Foo = tuple([number, string])
const foo = cast(Foo, [10, 'hello'])
const arr = cast(readonlyArray(number), [1, 2, 3, 4, 5, 6])

const Point = obj({ y: number, z: number }, { x: number })
const pt = cast(Point, { x: 1, z: 3 })

/* eslint-disable functional/no-let */

const factorial = checked([number], number, n => {
  let fact = 1
  for (let i = 2; i <= n; ++i) {
    fact *= i
  }
  return fact
})

const n = cast(Int, 10)

const fact = factorial(n)

// eslint-disable-next-line
console.log({ num, str, bool, foo, arr, pt, i: n, color, fact })
