// Navbar.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'widgets/Navbar'
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Light: Story = {
  args: {}
}
Light.decorators = [StoreDecorator({})]

export const Dark: Story = {
  args: {}
}
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)]

export const AuthNavbar: Story = {
  args: {}
}
AuthNavbar.decorators = [StoreDecorator({ profile: {} })]
