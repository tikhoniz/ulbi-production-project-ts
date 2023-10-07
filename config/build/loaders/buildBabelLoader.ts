import type { BuildOptions } from '../types/config'

export function buildBabelLoader({ isDev }: BuildOptions) {
  return {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true
            }
          ],
          isDev && require.resolve('react-refresh/babel')
          // поскольку плагин обновления добавляется по условию и это условие
          // не соблюдается, то в массив plugins добавляется false. Что бы этого не произошло, фильтруем все булевы значения
        ].filter(Boolean)
      }
    }
  }
}
