// AddNewComment.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { CommentCard } from './CommentCard'

const meta: Meta<typeof CommentCard> = {
  component: CommentCard,
  title: 'entities/Comment/CommentCard'
}

export default meta
type Story = StoryObj<typeof CommentCard>

export const Normal: Story = {
  args: {
    comment: {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Petya' }
    }
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

Normal.decorators = [StoreDecorator({})]
