// ArticleRecommendationList.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ArticleRecommendationList } from './ArticleRecommendationList'

const meta: Meta<typeof ArticleRecommendationList> = {
  component: ArticleRecommendationList,
  title: 'features/ArticleRecommendationList'
}

export default meta
type Story = StoryObj<typeof ArticleRecommendationList>

export const Normal: Story = {
  args: {}
}
