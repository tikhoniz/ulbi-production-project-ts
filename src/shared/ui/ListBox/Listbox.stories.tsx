// Listbox.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ListBox } from './ListBox'

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  title: 'shared/Listbox'
}

export default meta
type Story = StoryObj<typeof ListBox>

export const Primary: Story = {
  args: {}
}
