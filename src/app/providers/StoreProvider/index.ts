import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import type { ReduxStoreWithManager, StateSchema } from './config/StateSchema'
import { createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export {
  StoreProvider,
  createReduxStore,
  useAppDispatch,
  useAppSelector,
  type ReduxStoreWithManager,
  type StateSchema
}
