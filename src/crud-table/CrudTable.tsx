import React from 'react'
import { useImmerReducer } from 'use-immer'
import { verify } from '../safe'
import {
  CrudTableAction,
  crudTableReducer,
  CrudTableState,
} from './crudTableReducer'
import { Get, GetProps } from './Get'

export interface FetchValues {
  readonly page: number
  readonly sort: string
  readonly order: 'asc' | 'desc'
}

export interface CrudTableComponentProps<T> {
  readonly idKey: keyof T
  readonly data: readonly T[]
  // refresh(): void

  readonly state: CrudTableState<T>
  readonly dispatch: React.Dispatch<CrudTableAction<T>>
}

export interface CrudTableProps<T> {
  // API call. [page, sort, order] is query parameters tuple
  readonly asyncFn: GetProps<
    readonly T[],
    // tslint:disable-next-line: readonly-array
    readonly [number, keyof T, 'asc' | 'desc']
  >['asyncFn']

  readonly idKey: keyof T

  // Initially selected columns to display
  readonly initialColumns: ReadonlyArray<keyof T>

  // Initially sorted with this key. If not provided, sorting will be disabled
  readonly initialSort: keyof T

  children(props: CrudTableComponentProps<T>): JSX.Element

  // readonly columnSelectable?: boolean
  // readonly rowSelectable?: boolean
}

export function CrudTable<T>({
  idKey,
  asyncFn,
  initialColumns,
  initialSort,
  children: CrudTableView,
}: CrudTableProps<T>): JSX.Element {
  const initialState: CrudTableState<T> = React.useMemo(
    () => ({
      page: 1,
      sort: initialSort,
      order: 'asc',
      selectedRows: [],
      selectedColumns: initialColumns,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [state, dispatch] = useImmerReducer(crudTableReducer, initialState)
  return (
    <Get asyncFn={asyncFn} deps={[state.page, state.sort, state.order]}>
      {data => (
        <CrudTableView
          state={state}
          dispatch={dispatch}
          idKey={idKey}
          data={data}
        />
      )}
    </Get>
  )
}

type CrudContext<T> = CrudTableComponentProps<T>
const CrudContext = React.createContext<CrudContext<any> | undefined>(undefined)

export function useCrudContext<T>(): CrudTableComponentProps<T> {
  const ctx = React.useContext(CrudContext)

  verify(ctx !== undefined)

  return ctx as CrudTableComponentProps<T>
}

export interface CrudProviderProps<T> {
  readonly value: CrudContext<T>
  readonly children: React.ReactNode
}

export function CrudProvider<T>({
  value,
  children,
}: CrudProviderProps<T>): JSX.Element {
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>
}
