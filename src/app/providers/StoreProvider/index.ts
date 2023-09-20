import { createReduxStore, type AppDispatch, type RootState } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

import type {
  ReduxStoreWithManager,
  StateSchema,
  ThunkConfig,
  ThunkExtraArg
} from './config/StateSchema'

export { StoreProvider, createReduxStore }

export type {
  AppDispatch,
  ReduxStoreWithManager,
  RootState,
  StateSchema,
  ThunkConfig,
  ThunkExtraArg
}
