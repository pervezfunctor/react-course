import React, { Dispatch, Reducer, ReducerAction, ReducerState } from 'react'
import { verify } from './safe'

export type StoreContext<R extends Reducer<any, any>> = readonly [
  ReducerState<R>,
  Dispatch<ReducerAction<R>>,
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  function useSelect<T>(selector: (state: ReducerState<R>) => T): T {
    const [state] = useStore()
    return React.useMemo(() => selector(state), [selector, state])
  }

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Store,
    useStore,
    useSelect,
  }
}
