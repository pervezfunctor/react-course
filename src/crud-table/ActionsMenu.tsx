// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   MenuItemProps,
//   MenuProps,
// } from '@material-ui/core'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import React from 'react'
// import { verify } from 'technoidentity-utils'
// import { ActionsMenuProps } from './types'

// interface ActionsMenuContext {
//   closeMenu(): void
//   onSelected?(value: string): void
// }

// const ActionsMenuContext = React.createContext<ActionsMenuContext | undefined>(
//   undefined,
// )

// function useActionsMenu(): ActionsMenuContext {
//   const ctx = React.useContext(ActionsMenuContext)

//   verify(ctx !== undefined)

//   return ctx
// }

// export type ActionsMenuItemProps<D extends React.ElementType, P> = Omit<
//   MenuItemProps<D, P>,
//   'onClick' | 'children'
// > & {
//   readonly value: string
//   readonly children: string
// }

// export const ActionsMenuItem = React.forwardRef(function ActionMenuItem<
//   D extends React.ElementType,
//   P
// >(
//   { value, ...props }: ActionsMenuItemProps<D, P>,
//   ref: MenuItemProps<D, any>,
// ): JSX.Element {
//   const { closeMenu, onSelected } = useActionsMenu()

//   return (
//     <MenuItem
//       ref={ref}
//       onClick={() => {
//         if (onSelected) {
//           onSelected(value)
//         }
//         closeMenu()
//       }}
//       {...props}
//     />
//   )
// })

// export const ActionsMenu: React.FC<ActionsMenuProps> = ({
//   onSelected,
//   ...props
// }) => {
//   const [anchorEl, setAnchorEl] = React.useState<MenuProps['anchorEl']>(
//     undefined,
//   )

//   const closeMenu = () => setAnchorEl(undefined)

//   const isOpen = !!anchorEl

//   return (
//     <ActionsMenuContext.Provider value={{ closeMenu, onSelected }}>
//       <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
//         <MoreVertIcon />
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         keepMounted
//         open={isOpen}
//         onClose={closeMenu}
//         {...props}
//       />
//     </ActionsMenuContext.Provider>
//   )
// }
