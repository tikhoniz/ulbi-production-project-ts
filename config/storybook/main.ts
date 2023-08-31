import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
import { RuleSetRule } from 'webpack'
import { buildSvgLoader } from '../../config/build/loaders/buildSvgLoader'
import { buildCssLoader } from '../build/loaders/buildCssLoader'

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async config => {
    config.resolve.modules.push(path.resolve(__dirname, '..', '..', 'src'))
    config.module.rules.push(buildCssLoader(true))
    // disable whatever is already set to load SVGs
    // фильтруем правила содержащие svg и отключаем его
    config.module.rules
      .filter((rule: RuleSetRule) => /svg/.test(rule.test as string))
      .forEach((rule: RuleSetRule) => (rule.exclude = /\.svg$/i))
    // добавляем в массив правил обработчик svg
    config.module.rules.push(buildSvgLoader())

    return config
  }
}
export default config
