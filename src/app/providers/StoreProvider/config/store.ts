import {
  configureStore,
  type AnyAction,
  type ReducersMapObject,
  type ThunkDispatch
} from '@reduxjs/toolkit'
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { type Dispatch } from 'react'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { type ReducersListEntry } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { userReducer } from '../../../../entities/User'
import { type StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'

// обязательные редьюсеры
const rootReducers: ReducersMapObject<StateSchema> = {
  user: userReducer
}
// создаем менеджер редьюсеров для возможности добавлять их асинхронно
const reducerManager = createReducerManager(rootReducers)

export function createReduxStore(
  initialState: any,
  // for storybook
  asyncReducers?: ReducersMapObject<StateSchema>
): ToolkitStore {
  // вся эта байда делается только для storybook, в сборку проекта асинхронные редьюсеры добавляются в компоненте DynamicModuleLoader
  if (asyncReducers) {
    Object.entries(asyncReducers).forEach(([keyName, reducer]: ReducersListEntry) => {
      reducerManager.add(keyName, reducer)
    })
  }

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState: initialState
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.reducerManager = reducerManager

  return store
}
// типизация
export type RootState = ReturnType<typeof reducerManager.reduce>
export type AppStore = ReturnType<typeof createReduxStore>['dispatch']

// hook для диспача изменений
export const useAppDispatch = (): ThunkDispatch<StateSchema, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppStore>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
