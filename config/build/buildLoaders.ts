import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { type RuleSetRule } from 'webpack'
import { type BuildOptions } from './types/config'

export function buildLoaders ({ isDev }: BuildOptions): RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from js strings
      // если в режиме разработки то минимизацию не использовать
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      // конфигурация для использования css модулей
      {
        loader: 'css-loader',
        options: {
          modules: {
            // если в именовании присутствует '.module.' применяется модульный подход
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            // при dev разработки название оставлять читабельными
            // '[hash:base64:8]' - восьмерка указывает на количество знаков в хеше
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          }
        }
      },
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }

  // если не использовать typescript - нужен babel-loader
  const typescriptLoader = {
    // лоадер для typescript
    test: /\.tsx?$/, // регулярное выражение по которому webpack будет находить файлы которые необходимо пропустить через лоадер
    use: 'ts-loader', // указывается лоадер который необходимо использовать
    exclude: /node_modules/
  }

  return [typescriptLoader, cssLoader, svgLoader, fileLoader]
}
