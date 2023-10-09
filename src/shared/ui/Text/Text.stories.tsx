// Modal.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text, TextSize, TextTheme } from './Text'

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'shared/Text'
}

export default meta
type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description'
  }
}

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR
  }
}

export const OnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun'
  }
}

export const OnlyText: Story = {
  args: {
    text: 'Description Description Description Description'
  }
}

export const PrimaryDark: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description'
  }
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitleDark: Story = {
  args: {
    title: 'Title lorem ipsun'
  }
}
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTextDark: Story = {
  args: {
    text: 'Description Description Description Description'
  }
}
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeM: Story = {
  args: {
    title: 'Titlte lorem',
    text: 'Description Description Description Description',
    size: TextSize.M
  }
}

export const SizeXL: Story = {
  args: {
    title: 'Titlte lorem',
    text: 'Description Description Description Description',
    size: TextSize.L
  }
}
