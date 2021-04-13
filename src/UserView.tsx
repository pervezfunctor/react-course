/* eslint-disable functional/prefer-readonly-type */

import React from 'react'
import type { Row } from 'react-table'
import type { GridChildComponentProps } from 'react-window'
import type { User } from './types'

export type UserData = Readonly<{
  rows: Row<User>[]
  prepareRow(row: Row<User>): void
}>

export type UserProps = Omit<GridChildComponentProps, 'data'> &
  Readonly<{
    data: UserData
  }>

export const UserView: React.FunctionComponent<UserProps> = props => {
  const { rowIndex, columnIndex, data, style } = props
  const { rows, prepareRow } = data

  const row = rows[rowIndex]
  if (!row) {
    return null
  }

  console.log({ row })
  if (!row.getRowProps) {
    prepareRow(row)
  }

  const column = row.cells[columnIndex]

  return <div {...column.getCellProps({ style })}>{column.render('Cell')}</div>
}
