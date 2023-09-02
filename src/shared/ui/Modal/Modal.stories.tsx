// Modal.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'shared/Modal'
}

export default meta
type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis excepturi consequuntur quasi laudantium dicta molestiae sequi? Corporis exercitationem aliquid, laborum perferendis, accusantium magni tempore doloremque officia provident eius odit.',
    isOpen: true
  }
}

export const Dark: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis excepturi consequuntur quasi laudantium dicta molestiae sequi? Corporis exercitationem aliquid, laborum perferendis, accusantium magni tempore doloremque officia provident eius odit.',
    isOpen: true
  }
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
