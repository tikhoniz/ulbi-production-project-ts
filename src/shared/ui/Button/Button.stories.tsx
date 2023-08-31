// Button.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ThemeButton } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'shared/Button'
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Text'
  }
}

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.CLEAR
  }
}

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE
  }
}
