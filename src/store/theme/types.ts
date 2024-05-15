export enum THEME {
  ELECTRIC_BLUE,
  FIRE,
  MONOCHROME,
  CUTE,
  GREEN,
}

export type ColorInput = [number, number, number];

export const THEME_COLORS = {
  [THEME.ELECTRIC_BLUE]: {
    primary: '#00a5b8',
    // primary: '#00FFFB',
    secondary: '#4b0085',
    // secondary: '#6D00C7',
    tertiary: [4, 0.5, 0.1] as ColorInput,
  },
  [THEME.FIRE]: {
    primary: '#ff0',
    secondary: '#f30',
    tertiary: [0.2, 2, 0.2] as ColorInput,
  },
  [THEME.MONOCHROME]: {
    primary: '#222',
    secondary: '#888',
    tertiary: [1, 1, 1] as ColorInput,
  },
  [THEME.CUTE]: {
    primary: '#7f3b9c',
    secondary: '#1cbdbd',
    tertiary: [3.2, 0, 3.2] as ColorInput,
  },
  [THEME.GREEN]: {
    primary: '#03ad06',
    secondary: '#fff700',
    tertiary: [0, 1.2, 1.2] as ColorInput,
  },
}

export interface ITheme {
  theme: THEME
  toggleTheme: () => void
}
