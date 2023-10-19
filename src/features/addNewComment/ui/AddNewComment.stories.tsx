// AddNewComment.stories.ts|tsx
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import AddNewComment from './AddNewComment'

const meta: Meta<typeof AddNewComment> = {
  component: AddNewComment,
  title: 'features/AddNewComment'
}

export default meta
type Story = StoryObj<typeof AddNewComment>

export const Primary: Story = {
  args: {
    onSendComment: action('onSendComment')
  }
}
Primary.decorators = [StoreDecorator({})]

// export const WithError: Story = {}
// WithError.decorators = [
//   StoreDecorator({
//     loginForm: { username: '123', password: 'asd', error: 'Error' }
//   })
// ]

// export const Loading: Story = {}
// Loading.decorators = [
//   StoreDecorator({
//     loginForm: { isLoading: true }
//   })
// ]
