import { useContext, useCallback } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../const/theme';

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  }, [theme, setTheme]);

  return {
    theme,
    toggleTheme,
  };
}
