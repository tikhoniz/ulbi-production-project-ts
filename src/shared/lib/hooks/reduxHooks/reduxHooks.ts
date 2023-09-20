import type { AppDispatch, RootState } from 'app/providers/StoreProvider'

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

// hook для диспача изменений
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
