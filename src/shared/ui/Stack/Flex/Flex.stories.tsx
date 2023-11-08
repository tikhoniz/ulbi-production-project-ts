// Flex.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: 'shared/Flex'
}

export default meta
type Story = StoryObj<typeof Flex>

export const Row: Story = {
  render: (args) => (
    <Flex {...args}>
      <div>{'first'}</div>
      <div>{'first'}</div>
      <div>{'first'}</div>
      <div>{'first'}</div>
      <div>{'first'}</div>
    </Flex>
  )
}
