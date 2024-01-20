// EditableProfileCard.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { EditableProfileCardHeader } from './EditableProfileCardHeader'

const meta: Meta<typeof EditableProfileCardHeader> = {
  component: EditableProfileCardHeader,
  title: 'features/editableProfileCard/EditableProfileCardHeader'
}

export default meta
type Story = StoryObj<typeof EditableProfileCardHeader>

export const Normal: Story = {
  args: {}
}
