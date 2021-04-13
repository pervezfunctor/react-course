import { flatten } from 'lodash-es'
import { useSWRInfinite } from 'swr'
import type { SWRInfiniteConfiguration } from 'swr/dist/types'
import { fetcher } from './utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInfinite<Data = any, Error = any>(
  url: string,
  perPage: number,
  config?: SWRInfiniteConfiguration<Data, Error>,
) {
  const result = useSWRInfinite(
    (page, prevData) =>
      prevData && prevData.length < perPage
        ? null
        : `${url}?page=${page + 1}&perPage=${perPage}`,
    fetcher,
    config,
  )

  const { data, error, setSize, isValidating } = result

  const isInitialLoading = !data && !error

  const isEndReached =
    (data as any)?.[0]?.length === 0 ||
    (data && (data as any)[data.length - 1]?.length < perPage)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const loadMore = async () => {
    if (isEndReached || isValidating) {
      return
    }
    await setSize(size => size + 1)
  }
  const flattened = flatten(data)

  const isItemLoaded = (index: number): boolean =>
    isEndReached || !!flattened[index]

  return {
    ...result,
    isInitialLoading,
    loadMore,
    isItemLoaded,
    isEndReached,
    flattened,
  }
}
