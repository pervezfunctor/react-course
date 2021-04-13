// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable react/jsx-key */

// import React from 'react'
// import {
//   FixedSizeGrid,
//   FixedSizeList,
//   ListOnItemsRenderedProps,
// } from 'react-window'
// import { getPersons } from './data'

// import InfiniteLoader from 'react-window-infinite-loader'
// import AutoSizer from 'react-virtualized-auto-sizer'

// export interface VirtualReactTableProps<D extends object> {
//   readonly itemCount: number
//   // eslint-disable-next-line functional/prefer-readonly-type
//   readonly columns: readonly string[]
//   // eslint-disable-next-line functional/prefer-readonly-type
//   readonly data: D[]
//   readonly height: number
//   readonly width: number
//   readonly onItemsRendered:
//     | ((props: ListOnItemsRenderedProps) => any)
//     | undefined
//   readonly ref: React.LegacyRef<FixedSizeList> | undefined
// }

// function VirtualReactTable<D extends object>({
//   onItemsRendered,
//   ref,
//   itemCount,
//   height,
//   width,
//   columns,
//   data,
// }: VirtualReactTableProps<D>): JSX.Element {
//   return (
//     // <FixedSizeGrid
//     //   onItemsRendered={onItemsRendered}
//     //   ref={ref}
//     //   height={height}
//     //   itemCount={itemCount}
//     //   itemSize={35}
//     //   width={Math.max(width, totalColumnsWidth)}
//     // >
//     //   {RenderRow}
//     // </FixedSizeGrid>
//     <div />
//   )
// }

// const itemCount = 1000

// export function VirtualReactTableExample(): JSX.Element {
//   const data = React.useMemo(() => getPersons(100), [])

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Row Index',
//         accessor: (_: any, i: any) => i,
//       },
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'lastName',
//           },
//         ],
//       },
//       {
//         Header: 'Info',
//         columns: [
//           {
//             Header: 'Age',
//             accessor: 'age',
//             width: 50,
//           },
//           {
//             Header: 'Visits',
//             accessor: 'visits',
//             width: 60,
//           },
//           {
//             Header: 'Status',
//             accessor: 'status',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'progress',
//           },
//         ],
//       },
//     ],
//     [],
//   )

//   const isItemLoaded = (): boolean => true
//   const loadMoreItems = async (): Promise<readonly any[]> =>
//     Promise.resolve(getPersons(100))

//   return (
//     <AutoSizer>
//       {({ height, width }) => (
//         <InfiniteLoader
//           isItemLoaded={isItemLoaded}
//           itemCount={data.length}
//           loadMoreItems={loadMoreItems}
//         >
//           {({ onItemsRendered, ref }) => (
//             <VirtualReactTable
//               height={height}
//               width={width}
//               itemCount={itemCount}
//               columns={columns}
//               data={data}
//               onItemsRendered={onItemsRendered}
//               ref={ref}
//             />
//           )}
//         </InfiniteLoader>
//       )}
//     </AutoSizer>
//   )
// }
