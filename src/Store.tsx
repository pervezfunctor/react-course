/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable functional/no-let */

import React, { Dispatch, Reducer, ReducerAction, ReducerState } from 'react'
import { verify } from './safe'

export type StoreContext<R extends Reducer<any, any>> = readonly [
  ReducerState<R>,
  Dispatch<ReducerAction<R>>,
]

export function createStore<R extends Reducer<any, any>>(reducer: R) {
  const StoreContext = React.createContext<StoreContext<R> | undefined>(
    undefined,
  )

  const Store: React.FC<{
    readonly initialState: ReducerState<R>
  }> = ({ children, initialState }) => {
    const value = React.useReducer(reducer, initialState)

    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
  }

  const useStore = (): StoreContext<R> => {
    const context = React.useContext(StoreContext)
    verify(context !== undefined)
    return context
  }

  function useSelect<T, A>(
    selector: (state: ReducerState<R>) => T,
    compute: (x: T) => A,
  ) {
    const sel = React.useRef(selector).current
    const cmp = React.useRef(compute).current

    const [state] = useStore()
    let s = sel(state)
    let result: any

    return function <A>(): A {
      const s2 = sel(state)
      if (result === undefined || s !== s2) {
        s = s2
        result = cmp(s)
      }
      return result
    }
  }

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Store,
    useStore,
    useSelect,
  }
}
