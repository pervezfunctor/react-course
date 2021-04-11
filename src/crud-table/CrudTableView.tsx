import {
  Table,
  TableBodyProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  Tbody,
} from '@chakra-ui/table'
import React from 'react'
import type { CrudTableAction, CrudTableState } from './crudTableReducer'
import { DefaultHeader } from './DefaultHeader'
import type { HeaderProps } from './types'

export interface CrudTableRowProps<T>
  extends Omit<TableRowProps, 'hover' | 'tabIndex' | 'selected'> {
  readonly key: any
  readonly idKey: keyof T
  readonly labels: ReadonlyArray<readonly [keyof T, string]>

  readonly state: CrudTableState<T>
  readonly dispatch: React.Dispatch<CrudTableAction<T>>

  readonly row: T
  readonly isSelected: boolean
}

export interface CrudTableViewProps<T> extends TableProps {
  readonly idKey: keyof T
  readonly data: readonly T[]
  readonly state: CrudTableState<T>
  readonly dispatch: React.Dispatch<CrudTableAction<T>>

  readonly labels: ReadonlyArray<readonly [keyof T, string]>
  readonly header?: React.FC<HeaderProps<T>>

  children(props: CrudTableRowProps<T>): JSX.Element

  readonly headProps: TableHeadProps
  readonly bodyProps?: TableBodyProps
}

export function CrudTableView<T>({
  idKey,
  data,
  state,
  dispatch,

  labels,
  children,
  header: Header = DefaultHeader,
  headProps,
  bodyProps,
  ...props
}: CrudTableViewProps<T>): JSX.Element {
  const isSelected = (row: T): boolean =>
    state.selectedRows.findIndex(r => row[idKey] === r[idKey]) !== -1

  return (
    <Table {...props}>
      <Header
        labels={labels}
        state={state}
        dispatch={dispatch}
        {...headProps}
      />

      <Tbody {...bodyProps}>
        {data.map(row =>
          children({
            key: row[idKey],
            idKey,
            state,
            dispatch,
            labels,
            isSelected: isSelected(row),
            row,
          }),
        )}
      </Tbody>
    </Table>

    // <Pager
    //   totalPages={10}
    //   currentPage={state.page}
    //   onPageChange={page => dispatch({ type: 'change page', page })}
    // />
  )
}
