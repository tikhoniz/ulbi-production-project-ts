import {
  configureStore,
  type CombinedState,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit'
import { $api } from 'shared/api/api'

import { uiReducer } from 'features/UI'
import { rtkApi } from 'shared/api/rtkApi'
import { userReducer } from '../../../../entities/User'
import {
  type StateSchema,
  type StateSchemaKey,
  type ThunkExtraArg
} from './StateSchema'
import { createReducerManager } from './reducerManager'

// обязательные редьюсеры
const rootReducers: ReducersMapObject<StateSchema> = {
  user: userReducer,
  ui: uiReducer,
  // добавляем редьюсер для RTK query (https://redux-toolkit.js.org/rtk-query/overview)
  [rtkApi.reducerPath]: rtkApi.reducer
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
        // добавляем middleware для RTK query (https://redux-toolkit.js.org/rtk-query/overview)
      }).concat(rtkApi.middleware)
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
// типизация
export type RootState = ReturnType<typeof reducerManager.reduce>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
