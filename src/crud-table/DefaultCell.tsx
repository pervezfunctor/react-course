import { Checkbox, Td } from '@chakra-ui/react'
import { format } from 'date-fns'
import { boolean } from 'io-ts'
import { date } from 'io-ts-types'
import React from 'react'
import type { CellProps } from './types'

function formatDate(date: Date | undefined): string | undefined {
  return date && format(date, 'dd/MM/yyyy')
}

export function DefaultCell<T>({
  name,
  row: value,
  ...props
}: CellProps<T>): JSX.Element {
  const v = value[name]

  return (
    <Td {...props}>
      {date.is(v) ? (
        <>{formatDate(v)}</>
      ) : boolean.is(v) ? (
        <Checkbox readOnly checked={v} />
      ) : v !== undefined ? (
        v
      ) : null}
    </Td>
  )
}
