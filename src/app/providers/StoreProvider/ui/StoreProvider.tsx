import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import { type StateSchema } from '../index'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  // for storybook
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = ({
  children,
  initialState,
  // for storybook
  asyncReducers
}: StoreProviderProps): JSX.Element => {
  const store = createReduxStore(
    initialState as StateSchema,
    // for storybook
    asyncReducers as ReducersMapObject<StateSchema>
  )
  return <Provider store={store}>{children}</Provider>
}
