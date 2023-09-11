// LoginForm.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'features/LoginForm'
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {}
