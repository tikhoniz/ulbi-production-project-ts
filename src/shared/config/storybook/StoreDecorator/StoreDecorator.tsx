import { type DeepPartial, type ReducersMapObject } from '@reduxjs/toolkit'
import type { StoryFn } from '@storybook/react'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer
}

export const StoreDecorator =
  (state: any) =>
  (StoryComponent: StoryFn): JSX.Element =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={defaultAsyncReducers}
      >
        <StoryComponent />
      </StoreProvider>
    )
