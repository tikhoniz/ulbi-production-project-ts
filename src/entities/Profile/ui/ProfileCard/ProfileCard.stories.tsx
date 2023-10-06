// ProfileCard.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Country } from '../../../../entities/Country'
import { Currency } from '../../../../entities/Currency'
import avatarImg from '../../../../shared/assets/tests/tim_photo_600x600.png'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
  title: 'entities/ProfileCard'
}

export default meta
type Story = StoryObj<typeof ProfileCard>

export const Primary: Story = {
  args: {
    data: {
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
}

export const WithError: Story = {
  args: {
    error: 'error'
  }
}
export const Loading: Story = {
  args: {
    isLoading: true
  }
}
