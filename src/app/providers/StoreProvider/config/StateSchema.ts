import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject
} from '@reduxjs/toolkit'
import { type AxiosInstance } from 'axios'
import type { LoginSchema } from 'features/AuthByUsername'
import { type UISchema } from 'features/UI'
import { type AddNewCommentSchema } from 'features/addNewComment'
import { type ArticleDetailsPageSchema } from 'pages/ArcticleDetailsPage/model/types'
import { type ArticlePageSchema } from 'pages/ArticlesPage'
import { type ArticleDetailsSchema } from '../../../../entities/Article'
import type { UserSchema } from '../../../../entities/User'
import { type rtkApi } from 'shared/api/rtkApi'
import { type ProfileSchema } from 'features/editableProfileCard'

export interface StateSchema {
  user: UserSchema
  // позиция скролла
  ui: UISchema
  // типизация RTK query
  // [rtkApi.reducerPath] - это путь до редьюсера
  //  ReturnType<typeof rtkApi.reducer> - возвращаемое значение
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  // асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addNewComment?: AddNewCommentSchema
  articlesPage?: ArticlePageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - вмонтирован редьюсер, false - демонтирован редьюсер
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
