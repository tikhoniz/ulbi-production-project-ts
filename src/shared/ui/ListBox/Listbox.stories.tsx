// Listbox.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ListBox } from './ListBox'

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  title: 'shared/Listbox',
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof ListBox>

export const Primary: Story = {
  args: {
    value: '123',
    items: [
      { content: '1asfasfasf23', value: '123' },
      { content: '1asfasfasf21233', value: '1232' }
    ]
  }
}
