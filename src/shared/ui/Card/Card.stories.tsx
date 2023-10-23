// Card.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { Text } from '../Text/Text'
import { Card } from './Card'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'shared/Card'
}

export default meta
type Story = StoryObj<typeof Card>

export const Normal: Story = {
  args: {
    children: <Text title='test' text='text text' />
  }
}

Normal.decorators = [StyleDecorator()]
