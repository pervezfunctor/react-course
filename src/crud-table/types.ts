import type {
  TableCellProps,
  TableHeadProps,
  TableRowProps,
} from '@chakra-ui/table'
import type { CrudTableAction, CrudTableState } from './crudTableReducer'

// export interface ActionsMenuProps
//   extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
//   onSelected?(value: string): void
// }

export interface RowProps<T>
  extends Omit<TableRowProps, 'hover' | 'tabIndex' | 'selected'> {
  readonly idKey: keyof T
  readonly labels: ReadonlyArray<readonly [keyof T, string]>

  readonly state: CrudTableState<T>
  readonly dispatch: React.Dispatch<CrudTableAction<T>>

  readonly row: T
  readonly isSelected: boolean

  children(props: CellProps<T>): JSX.Element

  // readonly actionsMenu?: React.FC<ActionsMenuProps>
  // onAction?(value: string, row: T): void
}

export interface HeaderProps<T> extends TableHeadProps {
  readonly labels: ReadonlyArray<readonly [keyof T, string]>

  readonly rowProps?: TableRowProps

  readonly state: CrudTableState<T>
  readonly dispatch: React.Dispatch<CrudTableAction<T>>
}

export interface CellProps<T> extends TableCellProps {
  readonly key: any
  readonly name: keyof T
  readonly row: T
}
