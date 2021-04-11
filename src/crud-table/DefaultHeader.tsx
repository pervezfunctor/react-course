import { Td, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import type { HeaderProps } from './types'

export function DefaultHeader<T>({
  state: { selectedColumns, sort, order },
  // dispatch,
  labels,
  rowProps,
  ...props
}: HeaderProps<T>): JSX.Element {
  return (
    <Thead {...props}>
      <Tr {...rowProps}>
        <Td />
        {labels
          .filter(l => selectedColumns.includes(l[0]))
          .map(l => l[0])
          .map(k => (
            <Td key={k as string} sortDirection={sort === k ? order : false}>
              {/* <TableSortLabel
                active={sort === k}
                direction={sort === k ? order : 'asc'}
                onClick={() => dispatch({ type: 'change sort order', sort: k })}
              >
                {labels[labels.findIndex(([key, _]) => key === k)][1]}
              </TableSortLabel> */}
            </Td>
          ))}
        {/* <TableCell>
          <MultiSelectDialog
            options={labels.map(last) as readonly string[]}
            values={labels.map(first) as readonly string[]}
            selected={selectedColumns as readonly string[]}
            onChange={columns =>
              dispatch({
                type: 'select columns',
                columns: columns as ReadonlyArray<keyof T>,
              })
            }
          />
        </TableCell> */}
      </Tr>
    </Thead>
  )
}
