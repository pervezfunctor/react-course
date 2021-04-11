import { Checkbox } from '@chakra-ui/checkbox'
import { Td, Tr } from '@chakra-ui/table'
import React from 'react'
import type { RowProps } from './types'

export function DefaultRow<T>({
  idKey,
  state: { selectedColumns },
  dispatch,
  labels,
  row,
  isSelected,
  // actionsMenu: ActionsMenu,
  // onAction,
  children,
  ...props
}: RowProps<T>): JSX.Element {
  const orderedColumns = React.useMemo(() => labels.map(([col]) => col), [
    labels,
  ])

  return (
    <Tr
      {...props}
      hover
      tabIndex={-1}
      key={row[idKey] as any}
      selected={isSelected}
    >
      <Td padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => dispatch({ type: 'toggle row', row, idKey })}
        />
      </Td>

      {orderedColumns
        .filter(c => selectedColumns.includes(c))
        .map(name => children({ key: name, row, name }))}

      {/* <Td>
        {ActionsMenu && (
          <ActionsMenu
            onSelected={onAction && (value => onAction(value, row))}
          />
        )}
      </Td> */}
    </Tr>
  )
}
