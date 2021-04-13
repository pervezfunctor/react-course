import { Box } from '@chakra-ui/react'
import React from 'react'
// import { Counter } from './Counter'
// import { UserTable } from './UserTable'
// import { VirtualReactTableExample } from './VirtualReactTable'
// import { VirtualTable } from './VirtualTable'
import { ReactBaseTableEx } from './ReactBaseTableEx'

export function App(): JSX.Element {
  console.log('App')
  return (
    <Box h="90vh" w="100%">
      {/* <Counter /> */}
      <ReactBaseTableEx />
      {/* <UserTable /> */}
      {/* <VirtualReactTableExample /> */}
      {/* {error && <div>{JSON.stringify(error, null, 2)}</div>}
      {data && <VirtualTable data={data} />} */}
      {/* {!data && !error && <div>Loading...</div>} */}
    </Box>
  )
}
