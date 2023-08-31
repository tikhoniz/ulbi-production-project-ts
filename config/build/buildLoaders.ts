import { type RuleSetRule } from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { type BuildOptions } from './types/config'
import { buildSvgLoader } from './loaders/buildSvgLoader'

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }
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
