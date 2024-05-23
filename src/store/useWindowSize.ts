import { createWithEqualityFn } from 'zustand/traditional';

export interface WindowSizeState {
  innerHeight: number;
  innerWidth: number;

  // Actions
  updateWindowSize: (height: number, width: number) => void;
}
export const useWindowSize = createWithEqualityFn<WindowSizeState>((set) => {
  return {
    innerHeight: 0,
    innerWidth: 0,

    // Actions
    updateWindowSize: (height, width) => {
      set(() => {
        return {
          innerHeight: height,
          innerWidth: width,
        };
      });
    }
  };
});
