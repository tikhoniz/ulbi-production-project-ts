import { type Meta, type StoryObj } from '@storybook/react'
import { ArticleViewSelector } from './ArticleViewSelector'

const meta: Meta<typeof ArticleViewSelector> = {
  component: ArticleViewSelector,
  title: 'shared/ArticleViewSelector'
}

export default meta
type Story = StoryObj<typeof ArticleViewSelector>

export const Primary: Story = {
  args: {}
}
