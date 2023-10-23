import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import type { LoginSchema } from 'features/AuthByUsername'
import { type NavigateOptions, type To } from 'react-router-dom'
import type { ProfileSchema } from '../../../../entities/Profile'
import type { UserSchema } from '../../../../entities/User'
import { type AddNewCommentSchema } from 'features/addNewComment'
import { type ArticleDetailsSchema } from '../../../../entities/Article'
import { type ArticleDetailsCommentsSchema } from 'pages/ArcticleDetailsPage'

export interface StateSchema {
  user: UserSchema
  // асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addNewComment?: AddNewCommentSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
