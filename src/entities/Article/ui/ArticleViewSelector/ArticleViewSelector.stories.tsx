// ArticleViewSelector.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { ArticleViewSelector } from './ArticleViewSelector'

const meta: Meta<typeof ArticleViewSelector> = {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector
}

export default meta
type Story = StoryObj<typeof ArticleViewSelector>

export const Normal: Story = {
  args: {}
}

Normal.decorators = [StyleDecorator()]
