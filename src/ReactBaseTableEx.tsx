/* eslint-disable no-underscore-dangle */
/* eslint-disable functional/immutable-data */
/* eslint-disable no-invalid-this */
/* eslint-disable functional/no-this-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-class */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react'
import Table, { AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'
import styled, { keyframes } from 'styled-components'
import { fakeUserColumns } from './fakeData'
import { useInfinite } from './useInfinite'

// const TOTAL_SIZE = 1005
// const PAGE_SIZE = 200

const columns = fakeUserColumns()
// const DATA = fakeUsers(TOTAL_SIZE)

// const delay = async (ms: number) =>
//   new Promise(resolve => setTimeout(resolve, ms))

const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  display: inline-block;
  border-radius: 100%;
  margin: 2px;
  border: 2px solid #0696d7;
  border-bottom-color: transparent;
  margin: 2px;
  width: 22px;
  height: 22px;
  animation: ${rotate} 0.75s linear infinite;
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

// interface ReactBaseTableExState {
//   readonly data: User[]
//   readonly loading: boolean
//   readonly loadingMore: boolean
//   readonly loadedAll: boolean
// }

// const fetchData = async (offset = 0, limit = PAGE_SIZE) =>
//   delay(3000).then(() => DATA.slice(offset, offset + limit))

const perPage = 100
export const ReactBaseTableEx: React.FC = () => {
  // const [state, setState] = React.useState<ReactBaseTableExState>({
  //   data: [],
  //   loading: true,
  //   loadingMore: false,
  //   loadedAll: false,
  // })

  // const isMounted = React.useRef(false)

  // const loadData = () => {
  //   fetchData(0, Math.random() < 0.2 ? 0 : PAGE_SIZE)
  //     .then(data => {
  //       if (!isMounted.current) {
  //         return
  //       }
  //       setState(state => ({
  //         ...state,
  //         data,
  //         loading: false,
  //         loadedAll: data.length < PAGE_SIZE,
  //       }))
  //     })
  //     .catch(err =>
  //       console.log(`Failed to load data: ${JSON.stringify(err, null, 2)}`),
  //     )
  // }

  // const loadMore = () => {
  //   setState(state => ({ ...state, loadingMore: true }))

  //   fetchData(state.data.length)
  //     .then(data => {
  //       if (!isMounted.current) {
  //         return
  //       }
  //       setState(state => ({
  //         ...state,
  //         data: [...state.data, ...data],
  //         loadingMore: false,
  //         loadedAll: data.length < PAGE_SIZE,
  //       }))
  //     })
  //     .catch(err =>
  //       console.log(`Failed to load more: ${JSON.stringify(err, null, 2)}`),
  //     )
  // }

  const {
    isEndReached,
    loadMore,
    isValidating,
    isInitialLoading,
    flattened: data,
  } = useInfinite('/users', perPage)

  const renderFooter = () => {
    if (isValidating) {
      return (
        <Footer>
          <Loader />
        </Footer>
      )
    }
    return null
  }

  const renderEmpty = () => {
    if (isInitialLoading) {
      return (
        <Empty>
          <Loader />
        </Empty>
      )
    }
    if (data.length === 0) {
      return <Empty>No data available</Empty>
    }
    return null
  }

  return (
    <>
      <Toolbar>
        <div>Loaded data length: {data.length}</div>
        <div>All data loaded: {isEndReached?.toString()}</div>
      </Toolbar>
      <AutoResizer>
        {({ width, height }) => (
          <div>
            <Table
              width={width}
              height={height}
              fixed
              columns={columns}
              data={data}
              disabled={isInitialLoading}
              onEndReached={loadMore}
              footerHeight={50}
              footerRenderer={renderFooter}
              emptyRenderer={renderEmpty}
            />
          </div>
        )}
      </AutoResizer>
    </>
  )
}
