// Dropdown.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'shared/Dropdown'
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Normal: Story = {
  args: {
    trigger: <Button>{'Open'}</Button>,
    items: [
      {
        content: 'first'
      },
      {
        content: 'second'
      },
      {
        content: 'third'
      }
    ]
  }
}
