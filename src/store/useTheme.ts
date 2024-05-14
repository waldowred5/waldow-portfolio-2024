import { createWithEqualityFn } from 'zustand/traditional';

enum THEME {
  ELECTRIC_BLUE,
  FIRE,
  MONOCHROME,
  CUTIE_BOYFRIEND,
  GREEN,
}

export const THEME_COLORS = {
  [THEME.ELECTRIC_BLUE]: {
    primary: '#00FFFB',
    secondary: '#6D00C7',
  },
  [THEME.FIRE]: {
    primary: '#ff0',
    secondary: '#f30',
  },
  [THEME.MONOCHROME]: {
    primary: '#222',
    secondary: '#888',
  },
  [THEME.CUTIE_BOYFRIEND]: {
    primary: '#a663e6',
    secondary: '#1cbdbd',
  },
  [THEME.GREEN]: {
    secondary: '#fff700',
    primary: '#1eb01e',
  },
}

interface ITheme {
  theme: THEME
  toggleTheme: () => void
}

export const useTheme = createWithEqualityFn<ITheme>((set) => {
  return {
    theme: THEME.ELECTRIC_BLUE,

    // Actions
    toggleTheme: () => {
      set((state) => {
        const theme = state.theme = state.theme < (Object.values(THEME).length / 2) - 1 ? (state.theme + 1) : THEME.ELECTRIC_BLUE;

        return {
          ...state,
          theme
        }
      })
    }
  }
})
