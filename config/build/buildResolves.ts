import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolves(options: BuildOptions): ResolveOptions {
	return {
		// позволяет писать экспорты без разрешения
		extensions: ['.tsx', '.ts', '.js'],
		//абсолютные пути в приоритете
		preferAbsolute: true,
		modules: [options.paths.src, 'node_modules'],
		// для каждого модуля главным файлом будет являться index
		mainFiles: ['index'],
		alias: {},
	};
}
