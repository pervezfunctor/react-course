/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/prefer-readonly-type */

import { Chance } from 'chance'
import { range } from 'lodash'

const chance = new Chance()

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
}

const newPerson = (): Person => {
  const statusChance = Math.random()
  return {
    firstName: chance.first(),
    lastName: chance.last(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export const getPersons = (len: number): Person[] => range(len).map(newPerson)
