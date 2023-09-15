import {
  configureStore,
  type AnyAction,
  type ReducersMapObject,
  type ThunkDispatch
} from '@reduxjs/toolkit'
import { type Dispatch } from 'react'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { userReducer } from '../../../../entities/User'
import { type StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const rootReducers: ReducersMapObject<StateSchema> = {
  user: userReducer
}

const reducerManager = createReducerManager(rootReducers)

export function createReduxStore(initialState: any): ToolkitStore {
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
