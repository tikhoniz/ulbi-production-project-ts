// ArticleEditPage.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import ArticleEditPage from './ArticleEditPage'

const meta: Meta<typeof ArticleEditPage> = {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage
}

export default meta
type Story = StoryObj<typeof ArticleEditPage>

export const Normal: Story = {
  args: {}
}
