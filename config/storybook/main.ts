import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
import { DefinePlugin, type RuleSetRule } from 'webpack'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'

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
  env: config => ({
    ...config,
    __IS_DEV__: 'true'
  }),
  webpackFinal: async (config, { configType }) => {
    //! выяснить правильный тип
    const rules: any = config?.module?.rules

    config?.resolve?.modules?.push(path.resolve(__dirname, '..', '..', 'src'))
    rules.push(buildCssLoader(true))
    // фильтруем правила содержащие svg и отключаем его
    rules
      .filter((rule: RuleSetRule) => rule.test?.toString().includes('svg'))
      .forEach((rule: RuleSetRule) => (rule.exclude = /\.svg$/i))
    // добавляем в массив правил обработчик svg
    rules.push(buildSvgLoader())
    // прокидываем глобальную переменную в storybook
    config?.plugins?.push(
      new DefinePlugin({
        __IS_DEV__: true
      })
    )

    return config
  }
}
export default config
