// ProfilePage.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ProfilePage from './ProfilePage'

const meta: Meta<typeof ProfilePage> = {
  component: ProfilePage,
  title: 'pages/ProfilePage'
}

export default meta
type Story = StoryObj<typeof ProfilePage>

export const Light: Story = {
  args: {}
}

Light.decorators = [
  StoreDecorator({
    profile: { readonly: true, isLoading: false, error: undefined, data: undefined }
  })
]

export const Dark: Story = {
  args: {}
}

Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: { readonly: true, isLoading: false, error: undefined, data: undefined }
  })
]
