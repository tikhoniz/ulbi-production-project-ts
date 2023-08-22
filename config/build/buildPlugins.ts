import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin, ProgressPlugin, WebpackPluginInstance } from 'webpack';
import { BuildOptions } from './types/config';

export function buildPlugins({
	paths,
	isDev,
}: BuildOptions): WebpackPluginInstance[] {
	return [
		// переносит index.html в папку build
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		// позволяет видеть прогресс билда
		new ProgressPlugin(),

		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),

		// позволяет прокидывать глобальные переменные в код
		new DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		}),
	];
}
