// ProfilePage.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Country } from '../../../entities/Country'
import { Currency } from '../../../entities/Currency'
import avatarImg from '../../../shared/assets/tests/tim_photo_600x600.png'
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
    profile: {
      form: {
        first: 'Tikhon',
        lastname: 'Iz',
        username: 'Tim',
        city: 'Moscow',
        age: 22,
        country: Country.Russia,
        currency: Currency.RUB,
        avatar: avatarImg
      }
    }
  })
]

export const Dark: Story = {
  args: {}
}

Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        first: 'Tikhon',
        lastname: 'Iz',
        username: 'Tim',
        city: 'Moscow',
        age: 22,
        country: Country.Russia,
        currency: Currency.RUB,
        avatar: avatarImg
      }
    }
  })
]
