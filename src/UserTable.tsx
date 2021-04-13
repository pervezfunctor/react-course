import React from 'react'
import { useInfinite } from './useInfinite'
import { UserTableView } from './UserTableView'

const perPage = 100

export const UserTable: React.FC = () => {
  const {
    flattened: users,
    error,
    isInitialLoading,
    isItemLoaded,
    isEndReached,
    loadMore,
  } = useInfinite('/users', perPage)

  if (error) {
    return <div>{error}</div>
  }

  if (isInitialLoading) {
    return <div>Loading...</div>
  }

  return (
    <UserTableView
      hasNextPage={!isEndReached}
      items={users}
      loadMoreItems={loadMore}
      isItemLoaded={isItemLoaded}
    />
  )
}
