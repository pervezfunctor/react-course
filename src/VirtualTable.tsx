import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'

const keys = ['id', 'name']

const Cell: React.FC<GridChildComponentProps & { readonly user: any }> = ({
  columnIndex,
  style,
  user,
}) => {
  console.log({ user })
  return <div style={style}>{user[keys[columnIndex] as any]}</div>
}
export interface VirtualTableProps {
  readonly data: readonly any[]
}
export const VirtualTable: React.FC<VirtualTableProps> = ({ data }) => {
  const cc = Object.keys(data[0]).length

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          className="Grid"
          columnCount={cc}
          columnWidth={500}
          height={height}
          rowCount={data.length}
          rowHeight={35}
          width={width}
          overscanColumnCount={100}
        >
          {props => <Cell {...props} user={data[props.rowIndex]} />}
        </Grid>
      )}
    </AutoSizer>
  )
}
