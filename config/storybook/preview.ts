import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { Theme } from '../../src/app/providers/ThemeProvider'
import '../../src/app/styles/index.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
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
  decorators: [ThemeDecorator(Theme.LIGHT), StyleDecorator(), withRouter]
}

export default preview
