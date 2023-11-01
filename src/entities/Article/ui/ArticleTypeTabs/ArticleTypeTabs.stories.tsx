// Card.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { ArticleTypeTabs } from './ArticleTypeTabs'

const meta: Meta<typeof ArticleTypeTabs> = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs
}

export default meta
type Story = StoryObj<typeof ArticleTypeTabs>

export const Normal: Story = {
  args: {}
}

Normal.decorators = [StyleDecorator()]
