// глобальная декларация типов

// включает возможность использовать модули
declare module '*.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classnames: IClassNames;
	export = classnames;
}
