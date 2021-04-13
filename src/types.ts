import { number, string, TypeOf } from 'io-ts'
import { req } from './safe'

export const User = req({
  id: number,
  firstName: string,
  lastName: string,
  suffix: string,
  job: string,
})

export type User = TypeOf<typeof User>
