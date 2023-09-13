import type { StoryFn } from '@storybook/react'
import { StoreProvider } from 'app/providers/StoreProvider'

export const StoreDecorator =
  (state: any) =>
  (StoryComponent: StoryFn): JSX.Element =>
    (
      <StoreProvider initialState={state}>
        <StoryComponent />
      </StoreProvider>
    )
