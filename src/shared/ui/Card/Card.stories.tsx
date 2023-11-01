// Card.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { Text } from '../Text/Text'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card
}

export default meta
type Story = StoryObj<typeof Card>

export const Normal: Story = {
  args: {
    children: <Text title='test' text='text text' />
  }
}

Normal.decorators = [StyleDecorator()]
