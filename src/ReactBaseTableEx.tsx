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
import { fakeUserColumns, fakeUsers } from './fakeData'
import type { User } from './types'

const TOTAL_SIZE = 1005
const PAGE_SIZE = 200

const columns = fakeUserColumns()
const DATA = fakeUsers(TOTAL_SIZE)

const delay = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

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

interface ReactBaseTableExState {
  readonly data: User[]
  readonly loading: boolean
  readonly loadingMore: boolean
  readonly loadedAll: boolean
}

const fetchData = async (offset = 0, limit = PAGE_SIZE) =>
  delay(3000).then(() => DATA.slice(offset, offset + limit))

export const ReactBaseTableEx: React.FC = () => {
  const [state, setState] = React.useState<ReactBaseTableExState>({
    data: [],
    loading: true,
    loadingMore: false,
    loadedAll: false,
  })

  const isMounted = React.useRef(false)

  const loadData = () => {
    fetchData(0, Math.random() < 0.2 ? 0 : PAGE_SIZE)
      .then(data => {
        if (!isMounted.current) {
          return
        }
        setState(state => ({
          ...state,
          data,
          loading: false,
          loadedAll: data.length < PAGE_SIZE,
        }))
      })
      .catch(err =>
        console.log(`Failed to load data: ${JSON.stringify(err, null, 2)}`),
      )
  }

  const loadMore = () => {
    setState(state => ({ ...state, loadingMore: true }))

    fetchData(state.data.length)
      .then(data => {
        if (!isMounted.current) {
          return
        }
        setState(state => ({
          ...state,
          data: [...state.data, ...data],
          loadingMore: false,
          loadedAll: data.length < PAGE_SIZE,
        }))
      })
      .catch(err =>
        console.log(`Failed to load more: ${JSON.stringify(err, null, 2)}`),
      )
  }

  const handleEndReached = () => {
    const { loading, loadingMore, loadedAll } = state
    if (loading || loadingMore || loadedAll) {
      return
    }
    loadMore()
  }

  const renderFooter = () => {
    if (!state.loadingMore) {
      return null
    }
    return (
      <Footer>
        <Loader />
      </Footer>
    )
  }

  const renderEmpty = () => {
    if (state.loading) {
      return (
        <Empty>
          <Loader />
        </Empty>
      )
    }
    if (state.data.length === 0) {
      return <Empty>No data available</Empty>
    }
    return null
  }

  React.useEffect(() => {
    isMounted.current = true
    loadData()
    return () => {
      isMounted.current = false
    }
  }, [])

  const { data, loading, loadingMore, loadedAll } = state

  return (
    <>
      <Toolbar>
        <div>Loaded data length: {data.length}</div>
        <div>All data loaded: {loadedAll.toString()}</div>
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
              disabled={loading}
              footerHeight={loadingMore ? 50 : 0}
              onEndReachedThreshold={300}
              onEndReached={handleEndReached}
              footerRenderer={renderFooter}
              emptyRenderer={renderEmpty}
            />
          </div>
        )}
      </AutoResizer>
    </>
  )
}
