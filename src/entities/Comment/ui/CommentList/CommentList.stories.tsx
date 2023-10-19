// AddNewComment.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { CommentList } from './CommentList'

const meta: Meta<typeof CommentList> = {
  component: CommentList,
  title: 'entities/Comment/CommentList'
}

export default meta
type Story = StoryObj<typeof CommentList>

export const Normal: Story = {
  args: {
    comments: [
      { id: '1', text: 'hello world', user: { id: '1', username: 'Petya' } },
      { id: '2', text: 'hello world!', user: { id: '2', username: 'Olga' } },
      { id: '3', text: 'Hello world!', user: { id: '3', username: 'Sveta' } }
    ]
  }
}
Normal.decorators = [StoreDecorator({})]

export const Loading: Story = {
  args: {
    comments: [],
    isLoading: true
  }
}
Loading.decorators = [StoreDecorator({})]
