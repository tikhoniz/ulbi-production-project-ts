import type { ReducersMapObject } from '@reduxjs/toolkit'
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

export const StoreProvider = (props: StoreProviderProps): JSX.Element => {
  // asyncReducers для storybook
  const { children, initialState, asyncReducers } = props

  // что бы была возможность управлять роутингом в асинхронных запросах передаем функцию navigate в store что бы можно получить в параметре extra в async thunkAPI
  // const navigate = useNavigate()

  const store = createReduxStore(
    initialState as StateSchema,
    // for storybook
    asyncReducers as ReducersMapObject<StateSchema>
    // navigate
  )
  return <Provider store={store}>{children}</Provider>
}
