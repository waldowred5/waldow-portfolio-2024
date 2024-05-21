import { createWithEqualityFn } from 'zustand/traditional';
import { EdgeState } from './types';

export default createWithEqualityFn<EdgeState>((set) => {
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
