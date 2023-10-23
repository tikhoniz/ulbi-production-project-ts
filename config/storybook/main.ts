import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
import { DefinePlugin, type RuleSetRule } from 'webpack'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'
import type { BuildPaths } from '../build/types/config'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6'
  ],
  docs: {
    autodocs: 'tag'
  },
  env: (config) => ({
    ...config,
    __IS_DEV__: 'true'
  }),
  webpackFinal: async (config, { configType }) => {
    const paths: BuildPaths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src')
    }
    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')
    //! выяснить правильный тип
    const rules: any = config.module?.rules
    rules.push(buildCssLoader(true))
    // фильтруем правила содержащие svg и отключаем его
    rules
      .filter((rule: RuleSetRule) => rule.test?.toString().includes('svg'))
      .forEach((rule: RuleSetRule) => (rule.exclude = /\.svg$/i))
    // добавляем в массив правил обработчик svg
    rules.push(buildSvgLoader())
    // прокидываем глобальную переменную в storybook
    config.plugins?.push(
      new DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook')
      })
    )

    return config
  }
}
export default config
