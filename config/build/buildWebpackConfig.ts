import type webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { type BuildOptions } from './types/config'

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options
  return {
    // development указывается на стадии разработки, при production webpack минимизирует код
    mode,
    // стартовая точка приложения
    entry: paths.entry,
    // куда будет билдится приложение
    output: {
      // для предотвращения кеширования необходимо при билде создавать динамичное название сбилдиного файла
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true, // очищает папку build при новой сборке
      publicPath: '/' //! выяснить
    },
    // плагины в webpack позволяют выполнять задачи после сборки бандла
    plugins: buildPlugins(options),
    module: {
      // в rules конфигурируются лоадеры которые предназначены для обработки файлов которые выходят за рамки javascript, такие как jpg,svg, css, ts
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    // в режиме разработки покажет в каком файле ошибка
    devtool: isDev ? 'inline-source-map' : undefined,
    // в режиме разработки поднимает сервер webpack
    devServer: isDev ? buildDevServer(options) : undefined
    // devServer: { port: 9000, open: true, historyApiFallback: true, hot: true }
  }
}
