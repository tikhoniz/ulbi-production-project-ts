import { type RuleSetRule } from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { type BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }
  const babelLoader = buildBabelLoader(options)

  // подключение загрузчика SVG
  const svgLoader = buildSvgLoader()
  // подключение загрузчика стилей
  const cssLoader = buildCssLoader(isDev)
  // если не использовать typescript лоадер - нужен babel-loader
  const typescriptLoader = {
    // лоадер для typescript
    test: /\.tsx?$/, // регулярное выражение по которому webpack будет находить файлы которые необходимо пропустить через лоадер
    use: 'ts-loader', // указывается лоадер который необходимо использовать
    exclude: /node_modules/
  }

  return [typescriptLoader, cssLoader, svgLoader, fileLoader]
}
