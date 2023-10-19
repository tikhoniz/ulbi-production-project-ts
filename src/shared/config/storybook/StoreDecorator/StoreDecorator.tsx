import type { StoryFn } from '@storybook/react'
import { StoreProvider, type StateSchema } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { addNewCommentReducer } from 'features/addNewComment/model/slices/addNewCommentSlice'
import { type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../../../entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from '../../../../entities/Profile'
import { articleDetailsCommentsReducer } from 'pages/ArcticleDetailsPage/model/slices/articleDetailsCommentsSlice'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsComments: articleDetailsCommentsReducer
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (StoryComponent: StoryFn): JSX.Element =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    )
