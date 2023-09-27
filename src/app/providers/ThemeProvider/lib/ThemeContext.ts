import { createContext } from 'react'

// перечисление возможных тем
export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme'
}

export interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

// ключ для записи выбранной темы в local storage
export const LOCAL_STORAGE_THEME_KEY = 'theme'
