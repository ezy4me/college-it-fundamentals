import { Theme } from "@/shared/const/theme";

export const lightTheme = {
  "--bg-color": "#f5f5f5",
  "--text-color": "#0d0d0d",
  "--primary-color": "#5626C4",
  "--primary-color-hover": "#4a21ac",
  "--text-on-primary": "#ffffff",
  "--secondary-color": "#FACD3D",
  "--secondary-color-hover": "#e6ba32",
  "--accent-color": "#2CCCC3",
  "--hover-bg": "rgba(255, 255, 255, 0.1)",
  "--active-bg": "rgba(0, 0, 0, 0.02)",
  "--surface-color": "#ffffff",
  "--border-color": "#cccccc",

  "--error-bg": "#fdecea",
  "--error-text": "#b00020",
  "--error-border": "#f5c6cb",
  "--error-shadow": "rgba(176, 0, 32, 0.2)",
};

export const darkTheme = {
  "--bg-color": "#181818",
  "--text-color": "#ffffff",
  "--primary-color": "#E60576",
  "--primary-color-hover": "#cc0563",
  "--text-on-primary": "#ffffff",
  "--secondary-color": "#FACD3D",
  "--secondary-color-hover": "#e6ba32",
  "--accent-color": "#2CCCC3",
  "--hover-bg": "rgba(255, 255, 255, 0.1)",
  "--active-bg": "rgba(255, 255, 255, 0.1)",
  "--surface-color": "#242424",
  "--border-color": "#444444",

  "--error-bg": "#5a1a1a",
  "--error-text": "#ff6b6b",
  "--error-border": "#7f2a2a",
  "--error-shadow": "rgba(255, 107, 107, 0.4)",
};

export const themes = {
  [Theme.LIGHT]: lightTheme,
  [Theme.DARK]: darkTheme,
};
