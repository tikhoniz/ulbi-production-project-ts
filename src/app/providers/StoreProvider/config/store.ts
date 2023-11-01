import {
  configureStore,
  type CombinedState,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit'
import { $api } from 'shared/api/api'

import { uiReducer } from 'features/UI'
import { userReducer } from '../../../../entities/User'
import { createReducerManager } from './reducerManager'
import {
  type StateSchema,
  type StateSchemaKey,
  type ThunkExtraArg
} from './StateSchema'

// обязательные редьюсеры
const rootReducers: ReducersMapObject<StateSchema> = {
  user: userReducer,
  ui: uiReducer
}
// создаем менеджер редьюсеров для возможности добавлять их асинхронно
const reducerManager = createReducerManager(rootReducers)

export function createReduxStore(
  initialState?: StateSchema,
  // for storybook
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  // вся эта байда делается только для storybook, в сборку проекта асинхронные редьюсеры добавляются в компоненте DynamicModuleLoader
  if (asyncReducers) {
    Object.entries(asyncReducers).forEach(([keyName, reducer]) => {
      reducerManager.add(keyName as StateSchemaKey, reducer)
    })
  }

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: extraArg }
      })
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
// типизация
export type RootState = ReturnType<typeof reducerManager.reduce>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
