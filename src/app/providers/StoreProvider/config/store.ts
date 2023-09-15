import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { userReducer } from '../../../../entities/User'
import { createReducerManager } from './reducerManager'
import { type StateSchema } from './StateSchema'

const rootReducers: ReducersMapObject<StateSchema> = {
  user: userReducer
}

const reducerManager = createReducerManager(rootReducers)

export function createReduxStore(initialState: any) {
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
export const useAppDispatch = () => useDispatch<AppStore>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
