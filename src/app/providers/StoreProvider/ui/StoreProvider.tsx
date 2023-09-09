import type { DeepPartial } from '@reduxjs/toolkit'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore, type StateSchema } from '../index'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps): JSX.Element => {
  const store = createReduxStore(initialState as StateSchema)

  return <Provider store={store}>{children}</Provider>
}
