// CurrencySelect.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CountrySelect } from './CountrySelect'

const meta: Meta<typeof CountrySelect> = {
  component: CountrySelect,
  title: 'entities/CountrySelect'
}

export default meta
type Story = StoryObj<typeof CountrySelect>

export const Primary: Story = {
  args: {}
}
