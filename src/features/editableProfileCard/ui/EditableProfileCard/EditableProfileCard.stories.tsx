// EditableProfileCard.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { EditableProfileCard } from './EditableProfileCard'

const meta: Meta<typeof EditableProfileCard> = {
  component: EditableProfileCard,
  title: 'features/editableProfileCard/EditableProfileCard'
}

export default meta
type Story = StoryObj<typeof EditableProfileCard>

export const Normal: Story = {
  args: {}
}
