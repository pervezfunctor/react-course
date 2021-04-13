import { Button } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import { createStore } from './Store'

type Action = { readonly type: 'increment' | 'decrement' }
type State = { readonly count: number }

const countReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const { Store: CountProvider, useStore: useCounter } = createStore(countReducer)

const CounterView = (): JSX.Element => {
  const [state, dispatch] = useCounter()

  return (
    <HStack>
      <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
      <Text>{state.count}</Text>
      <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
    </HStack>
  )
}

export const Counter = (): JSX.Element => (
  <CountProvider initialState={{ count: 0 }}>
    <CounterView />
  </CountProvider>
)
