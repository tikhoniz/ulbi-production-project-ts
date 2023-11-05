// ArticlesPageFilters.stories.ts|tsx
import { type Meta, type StoryObj } from '@storybook/react'
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator'
import { ArticlesPageFilters } from './ArticlesPageFilters'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof ArticlesPageFilters> = {
  title: 'pages/Article/ArticlesPageFilters',
  component: ArticlesPageFilters
}

export default meta
type Story = StoryObj<typeof ArticlesPageFilters>

export const Normal: Story = {
  args: {}
}

Normal.decorators = [StyleDecorator(), StoreDecorator({})]
