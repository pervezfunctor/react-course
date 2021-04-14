/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Flex, Text } from '@chakra-ui/layout'
import { chakra, keyframes } from '@chakra-ui/react'
import React from 'react'
import Table, { AutoResizer, ColumnShape } from 'react-base-table'
import 'react-base-table/styles.css'
import type { User } from './types'
import { useInfinite } from './useInfinite'

const colDefs: Record<keyof User, string> = {
  id: 'ID',
  firstName: 'First Name',
  lastName: 'Last Name',
  suffix: 'Suffix',
  job: 'Jop Description',
}

// eslint-disable-next-line functional/prefer-readonly-type
const columns: ColumnShape[] = Object.keys(colDefs).map(c => ({
  title: (colDefs as any)[c],
  key: c,
  dataKey: c,
  width: 150,
}))

const Empty = chakra('div', {
  baseStyle: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loader = chakra('div', {
  baseStyle: {
    display: 'inline-block',
    borderRadius: '100%',
    margin: '2px',
    border: '2px solid #0696d7',
    borderBottomColor: 'transparent',
    width: '22px',
    height: '22px',
    animation: `${rotate} 0.75s linear infinite`,
  },
})

const Footer = chakra('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})

const perPage = 100

export const ReactBaseTableEx: React.FC = () => {
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
      <Flex>
        <Text>Loaded data length: {data.length}</Text>
        <Text>All data loaded: {isEndReached?.toString()}</Text>
      </Flex>
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
