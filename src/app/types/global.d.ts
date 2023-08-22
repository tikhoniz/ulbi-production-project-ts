// глобальная декларация типов

// включает возможность использовать модули
declare module '*.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classnames: IClassNames;
	export = classnames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
	import { ReactElement, SVGProps } from 'react';
	const content: (props: SVGProps<SVGElement>) => ReactElement;
	export default content;
}

declare const __IS_DEV__: boolean;
