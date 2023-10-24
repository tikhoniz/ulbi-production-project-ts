import type { StoryFn } from '@storybook/react'

// eslint-disable-next-line react/display-name
export const StyleDecorator = (style?: any) => (StoryComponent: StoryFn) =>
  (
    <div
      style={{
        ...style
      }}
    >
      <StoryComponent />
    </div>
  )
