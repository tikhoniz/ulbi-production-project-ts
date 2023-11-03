import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {
  DefinePlugin,
  ProgressPlugin,
  type WebpackPluginInstance
} from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { type BuildOptions } from './types/config'

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project
}: BuildOptions): WebpackPluginInstance[] {
  const plugins = [
    // переносит index.html в папку build
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    // позволяет видеть прогресс билда
    new ProgressPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),

    // позволяет прокидывать глобальные переменные в код
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project)
    }),

    new CopyPlugin({
      patterns: [{ from: paths.locales, to: paths.buildLocales }]
    })
  ]
  // добавляем плагин BundleAnalyzerPlugin только при разработке, для того чтобы при сборке в
  // CI в гите сборка собиралась
  // плагин BundleAnalyzerPlugin для анализа размера бандла, флаг openAnalyzer: false, чтобы каждый раз не открывался при запуске
  // Webpack Bundle Analyzer is started at http://127.0.0.1:8888
  if (isDev) {
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  return plugins
}
