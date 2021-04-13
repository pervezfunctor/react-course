/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'
import AutoSizer from 'react-virtualized-auto-sizer'
import type { User } from './types'

// import { FixedSizeGrid } from 'react-window'
// import InfiniteLoader from 'react-window-infinite-loader'
// import type { UserData } from './UserView'
// import { UserView } from './UserView'

/* eslint-disable @typescript-eslint/naming-convention */
export const ROW_HEIGHT = 30
export const COLUMN_WIDTH = 200
export const COLUMN_COUNT = 4
export const ITEMS_TO_LOAD_COUNT = 100

// eslint-disable-next-line functional/prefer-readonly-type
// const columns = [
//   {
//     Header: 'ID',
//     accessor: 'id',
//   },
//   {
//     Header: 'First Name',
//     accessor: 'firstName',
//   },
//   {
//     Header: 'Last Name',
//     accessor: 'lastName',
//   },
//   {
//     Header: 'Suffix',
//     accessor: 'suffix',
//   },
//   {
//     Header: 'Job',
//     accessor: 'job',
//   },
// ]

const columns: Record<keyof User, string> = {
  id: 'ID',
  firstName: 'First Name',
  lastName: 'Last Name',
  suffix: 'Suffix',
  job: 'Jop Description',
}

interface UserTableViewProps {
  readonly hasNextPage: boolean
  // eslint-disable-next-line functional/prefer-readonly-type
  readonly items: User[]
  readonly loadMoreItems: (
    startIndex: number,
    stopIndex: number,
  ) => Promise<any>
  readonly isItemLoaded: (index: number) => boolean
}

export const UserTableView: React.FunctionComponent<UserTableViewProps> = props => {
  const { items } = props

  // const itemCount = hasNextPage ? items.length + 1 : items.length

  // const { headers, rows, prepareRow } = useTable({ data: items, columns })

  // const itemData: UserData = React.useMemo(
  //   () => ({
  //     headers,
  //     rows,
  //     prepareRow,
  //   }),
  //   [headers, rows, prepareRow],
  // )

  console.log('UserTableView')

  return (
    // <InfiniteLoader
    //   isItemLoaded={isItemLoaded}
    //   itemCount={itemCount}
    //   loadMoreItems={loadMoreItems}
    // >
    //   {({ onItemsRendered, ref }) => (
    <AutoSizer>
      {({ width, height }) => (
        <BaseTable data={items} width={width} height={height}>
          {Object.keys(columns).map(c => (
            <Column
              title={(columns as any)[c]}
              key={c}
              dataKey={c}
              width={150}
            />
          ))}
        </BaseTable>
        // <FixedSizeGrid
        //   height={height}
        //   width={width}
        //   rowHeight={ROW_HEIGHT}
        //   columnWidth={COLUMN_WIDTH}
        //   rowCount={itemCount}
        //   columnCount={COLUMN_COUNT}
        //   itemData={itemData}
        //   onItemsRendered={({
        //     visibleRowStartIndex,
        //     visibleRowStopIndex,
        //     overscanRowStopIndex,
        //     overscanRowStartIndex,
        //   }) => {
        //     onItemsRendered({
        //       overscanStartIndex: overscanRowStartIndex,
        //       overscanStopIndex: overscanRowStopIndex,
        //       visibleStartIndex: visibleRowStartIndex,
        //       visibleStopIndex: visibleRowStopIndex,
        //     })
        //   }}
        //   ref={ref}
        // >
        //   {UserView}
        // </FixedSizeGrid>
      )}
    </AutoSizer>
    //     )}
    //   </InfiniteLoader>
  )
}
