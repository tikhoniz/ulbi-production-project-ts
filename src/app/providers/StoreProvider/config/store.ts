import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'features/AuthByUsername'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userReducer } from '../../../../entities/User'

const rootReducer = combineReducers({
  userReducer,
  loginReducer
})

export function createReduxStore(initialState: any) {
  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}

// типизация
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = AppStore['dispatch']
// hook для диспача изменений
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
