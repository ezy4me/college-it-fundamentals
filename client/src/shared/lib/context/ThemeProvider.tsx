import { useState, useEffect, type ReactNode } from 'react';

import { Theme } from '@/shared/const/theme';

import { themes } from '../themes';
import { applyTheme } from '../utils/applyTheme';

import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'app_theme';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(Theme.LIGHT);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(themes[newTheme]);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(themes[savedTheme]);
    } else {
      setTheme(Theme.LIGHT);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
