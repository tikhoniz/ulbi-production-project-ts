import type { Preview } from '@storybook/react'
import { Theme } from '../../src/app/providers/ThemeProvider'
import '../../src/app/styles/index.scss'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  // global.__BASE_PATH__ = "/",
  decorators: [ThemeDecorator(Theme.LIGHT), RouterDecorator]
}

export default preview
