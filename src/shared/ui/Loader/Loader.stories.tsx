// Sidebar.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
  component: Loader,
  title: 'shared/Loader'
}

export default meta
type Story = StoryObj<typeof Loader>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {}
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
