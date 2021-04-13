import { Chance } from 'chance'
import { map, range } from 'lodash-es'
import type { ColumnShape } from 'react-base-table'
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

const columns: Record<keyof User, string> = {
  id: 'ID',
  firstName: 'First Name',
  lastName: 'Last Name',
  suffix: 'Suffix',
  job: 'Jop Description',
}

// eslint-disable-next-line functional/prefer-readonly-type
export const fakeUserColumns = (): ColumnShape[] =>
  Object.keys(columns).map(c => ({
    title: (columns as any)[c],
    key: c,
    dataKey: c,
    width: 150,
  }))
