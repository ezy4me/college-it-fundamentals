import { Theme } from "@/shared/const/theme";

export const lightTheme = {
  '--bg-color': '#f5f5f5',
  '--text-color': '#0d0d0d', 
  '--primary-color': '#5626C4', 
  '--text-on-primary': '#ffffff', 
  '--secondary-color': '#FACD3D',
  '--accent-color': '#2CCCC3',
  '--hover-bg': 'rgba(255, 255, 255, 0.1)',
  '--active-bg': 'rgba(0, 0, 0, 0.02)',
  '--surface-color': '#ffffff',
};

export const darkTheme = {
  '--bg-color': '#181818',
  '--text-color': '#ffffff',
  '--primary-color': '#E60576', 
  '--text-on-primary': '#ffffff', 
  '--secondary-color': '#FACD3D',
  '--accent-color': '#2CCCC3',
  '--hover-bg': 'rgba(255, 255, 255, 0.1)',
  '--active-bg': 'rgba(255, 255, 255, 0.1)',
  '--surface-color': '#242424',
};


export const themes = {
  [Theme.LIGHT]: lightTheme,
  [Theme.DARK]: darkTheme,
};
