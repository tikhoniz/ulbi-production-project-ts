import { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

type Props = {
	children?: React.ReactNode;
};
// явно приводим тип ключа из local storage к типу Theme
const defaultTheme =
	(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider: FC<Props> = ({ children }) => {
	// устанавливаем темы
	const [theme, setTheme] = useState<Theme>(defaultTheme);

	// чтобы при каждом рендеренге компонента не создавался заново объект настроек с новой ссылкой и соответственно не перерисовывался компонент
	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
