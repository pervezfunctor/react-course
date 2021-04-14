import { Chance } from 'chance'
import { map, range } from 'lodash-es'
import type { User } from './types'

const chance = new Chance()

export const fakeUsers = (n: number): readonly User[] =>
  map(range(n), () => ({
    id: chance.integer({ min: 1000, max: 1000000 }),
    firstName: chance.first(),
    lastName: chance.last(),
    suffix: chance.suffix(),
    job: chance.sentence({ words: 2 }),
  }))
