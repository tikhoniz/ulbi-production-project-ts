import { type Meta, type StoryObj } from '@storybook/react'
import ArticleDetailsPage from './ArticleDetailsPage'

const meta: Meta<typeof ArticleDetailsPage> = {
  component: ArticleDetailsPage,
  title: 'pages/ArticleDetailsPage'
}

export default meta
type Story = StoryObj<typeof ArticleDetailsPage>

export const Normal: Story = {
  args: {}
}
