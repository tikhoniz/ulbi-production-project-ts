// ErrorPage.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ErrorPage } from './ErrorPage'

const meta: Meta<typeof ErrorPage> = {
  component: ErrorPage,
  title: 'widgets/ErrorPage'
}

export default meta
type Story = StoryObj<typeof ErrorPage>

export const Light: Story = {
  args: {}
}

export const Dark: Story = {
  args: {}
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
