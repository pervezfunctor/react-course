import { castDraft, Draft } from 'immer'
import { uniqBy } from 'lodash-es'

export interface CrudTableState<T> {
  readonly sort: keyof T
  readonly order: 'asc' | 'desc'

  readonly selectedRows: readonly T[]
  readonly selectedColumns: ReadonlyArray<keyof T>

  readonly page: number
  // readonly perPage: number
}

export type CrudTableAction<T> =
  | { readonly type: 'change sort order'; readonly sort: keyof T }
  | {
      readonly type: 'select columns'
      readonly columns: ReadonlyArray<keyof T>
    }
  | {
      readonly type: 'toggle row'
      readonly row: T
      readonly idKey: keyof T
    }
  | { readonly type: 'change page'; readonly page: number }
// | { readonly type: 'change per page'; readonly perPage: number }

export function crudTableReducer<T>(
  draft: Draft<CrudTableState<T>>,
  action: CrudTableAction<T>,
): void {
  switch (action.type) {
    case 'change sort order':
      if (action.sort === draft.sort) {
        draft.order = draft.order === 'asc' ? 'desc' : 'asc'
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        draft.sort = castDraft(action.sort) as any
      }
      return
    case 'select columns':
      draft.selectedColumns = castDraft(action.columns)
      return
    case 'toggle row':
      const idx = draft.selectedRows.findIndex(
        r => (r as any)[action.idKey] === action.row[action.idKey],
      )

      if (idx === -1) {
        draft.selectedRows.push(castDraft(action.row))
      } else {
        draft.selectedRows.splice(idx, 1)
      }
      draft.selectedRows = uniqBy(
        draft.selectedRows,
        r => (r as any)[action.idKey],
      )
      return
    case 'change page':
      draft.page = action.page
      return
    // case 'change per page':
    //   draft.perPage = action.perPage
    //   return
  }
}

export function actions<T>(
  dispatch: React.Dispatch<CrudTableAction<T>>,
): {
  pageChange(page: number): void
  sortChange(sort: keyof T): void
  rowChange(row: T, idKey: keyof T): void
} {
  const pageChange = (page: number): void =>
    dispatch({ type: 'change page', page })

  const sortChange = (sort: keyof T): void =>
    dispatch({ type: 'change sort order', sort })

  const rowChange = (row: T, idKey: keyof T): void =>
    dispatch({ type: 'toggle row', row, idKey })

  return { pageChange, sortChange, rowChange }
}
