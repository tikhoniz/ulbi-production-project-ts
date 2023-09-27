// Avatar.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'shared/Select'
}

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { value: '123', content: 'первый пункт' },
      { value: '456', content: 'второй пункт' },
      { value: '789', content: 'третий пункт' },
      { value: '000', content: 'четвертый пункт' }
    ]
  }
}
