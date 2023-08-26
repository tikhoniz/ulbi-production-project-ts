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
  isDev
}: BuildOptions): WebpackPluginInstance[] {
  return [
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
      __IS_DEV__: JSON.stringify(isDev)
    }),
    // плагин для анализа размера бандла, флаг openAnalyzer: false, чтобы каждый раз не открывался при запуске
    // Webpack Bundle Analyzer is started at http://127.0.0.1:8888
    new BundleAnalyzerPlugin({ openAnalyzer: false })
  ]
}
