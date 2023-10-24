import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { Theme } from '../../src/app/providers/ThemeProvider'
import '../../src/app/styles/index.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'

const CUSTOM_VIEWPORTS = {
  MacbookPro: {
    name: 'MacbookPro 15',
    styles: {
      width: '1440px',
      height: '900px'
    }
  },
  iPhone_14_Pro: {
    name: 'iPhone 14 Pro',
    styles: {
      width: '393px',
      height: '852px'
    }
  },
  iPhone_14_Pro_Max: {
    name: 'iPhone 14 Pro Max',
    styles: {
      width: '430px',
      height: '932px'
    }
  },
  iPhone_X: {
    name: 'iPhone X',
    styles: {
      width: '375px',
      height: '812px'
    }
  }
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    viewport: {
      viewports: CUSTOM_VIEWPORTS
    },
    options: {
      storySort: {
        order: ['pages', 'widgets', 'features', 'entities', 'shared', '*']
      }
    }
  },

  decorators: [ThemeDecorator(Theme.LIGHT), StyleDecorator(), withRouter]
}

export default preview
