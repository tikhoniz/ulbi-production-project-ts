// LoginForm.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'features/LoginForm'
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {}
Primary.decorators = [
  StoreDecorator({
    loginReducer: { username: 'admin', password: '123' }
  })
]

export const WithError: Story = {}
WithError.decorators = [
  StoreDecorator({
    loginReducer: { username: '123', password: 'asd', error: 'Error' }
  })
]

export const Loading: Story = {}
Loading.decorators = [
  StoreDecorator({
    loginReducer: { isLoading: true }
  })
]
