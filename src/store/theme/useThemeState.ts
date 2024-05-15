import { createWithEqualityFn } from 'zustand/traditional';
import { ITheme, THEME } from './types.ts';

export const useThemeState = createWithEqualityFn<ITheme>((set) => {
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
