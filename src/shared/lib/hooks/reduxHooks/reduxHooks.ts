import { type AnyAction, type Dispatch, type ThunkDispatch } from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import { type AppStore, type RootState } from 'app/providers/StoreProvider/config/store'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

// hook для диспача изменений
export const useAppDispatch = (): ThunkDispatch<StateSchema, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppStore>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
