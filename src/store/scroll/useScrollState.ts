import { createWithEqualityFn } from 'zustand/traditional';

export interface ScrollState {
  scrollPercentage: number;

  // Actions
  updateScrollPercentage: (newScrollPercentage: number) => void;
}
export default createWithEqualityFn<ScrollState>((set) => {
  return {
    scrollPercentage: 0,

    // Actions
    updateScrollPercentage: (newScrollPercentage: number) => {
      set(() => {
        return {
          scrollPercentage: newScrollPercentage,
        };
      });
    }
  };
});
