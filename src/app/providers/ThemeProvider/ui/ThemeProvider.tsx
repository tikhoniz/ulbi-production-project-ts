import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from 'app/providers/ThemeProvider/lib/ThemeContext'
import { useMemo, useState, type FC } from 'react'

interface ThemeProviderProps {
  children?: React.ReactNode
  initialTheme?: Theme
}
// явно приводим тип ключа из local storage к типу Theme
const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  // устанавливаем темы
  const [theme, setTheme] = useState<Theme>(initialTheme ?? defaultTheme)

  // чтобы при каждом рендеренге компонента не создавался заново объект настроек с новой ссылкой и соответственно не перерисовывался компонент
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  )

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
