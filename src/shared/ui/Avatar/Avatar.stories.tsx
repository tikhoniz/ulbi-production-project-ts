// Avatar.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import avatarImg from '../../assets/tests/tim_photo_600x600.png'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'shared/Avatar'
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {
    src: avatarImg,
    size: 250
  }
}

export const Small: Story = {
  args: {
    src: avatarImg,
    size: 50
  }
}
