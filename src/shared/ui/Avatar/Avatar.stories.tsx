// Avatar.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import AvatarImg from './tim_photo_600x600.png'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'shared/Avatar'
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {
    src: AvatarImg,
    size: 250
  }
}

export const Small: Story = {
  args: {
    src: AvatarImg,
    size: 50
  }
}
