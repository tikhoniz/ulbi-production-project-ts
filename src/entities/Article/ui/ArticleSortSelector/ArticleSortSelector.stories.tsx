// ArticleSortSelector.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { ArticleSortSelector } from './ArticleSortSelector'

const meta: Meta<typeof ArticleSortSelector> = {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector
}

export default meta
type Story = StoryObj<typeof ArticleSortSelector>

export const Normal: Story = {
  args: {}
}

Normal.decorators = [StyleDecorator()]
