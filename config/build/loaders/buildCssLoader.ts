import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoader(isDev: boolean) {
  return {
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
}
