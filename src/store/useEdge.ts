import { createWithEqualityFn } from 'zustand/traditional';

interface EdgeState {
  maxEdgeLengthPercentage: number,

  // Actions
  updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => void,
}


export const useEdge = createWithEqualityFn<EdgeState>((set) => {
  return {
    maxEdgeLengthPercentage: 0.60,

    // Actions
    updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => {
      set(() => {
        return {
          maxEdgeLengthPercentage: newMaxEdgeLengthPercentage,
        };
      });
    },
  };
});
