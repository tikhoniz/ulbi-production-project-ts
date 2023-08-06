import { ResolveOptions } from 'webpack';

export function buildResolve(): ResolveOptions {
	return {
		// позволяет писать экспорты без разрешения
		extensions: ['.tsx', '.ts', '.js'],
	};
}
