// CurrencySelect.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CurrencySelect } from './CurrencySelect'

const meta: Meta<typeof CurrencySelect> = {
  component: CurrencySelect,
  title: 'entities/CurrencySelect'
}

export default meta
type Story = StoryObj<typeof CurrencySelect>

export const Primary: Story = {
  args: {}
}
