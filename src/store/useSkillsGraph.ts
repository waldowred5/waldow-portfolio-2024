import { createWithEqualityFn } from 'zustand/traditional';
import { useVertex } from './useVertex.ts';
import { useRelation } from './useRelation.ts';
import { useEdge } from './useEdge.ts';

export interface SkillsGraphState {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  },
  orbOpacity: number,
  orbRadius: number,
  radius: number,

  // Actions
  createNetwork: () => void,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (newOpacity: number) => void,
  updateOrbRadius: (newRadius: number) => void,
}

export const useSkillsGraph = createWithEqualityFn<SkillsGraphState>((set, get) => {
  return {
    orbColor: {
      red: 0.1,
      green: 0.1,
      blue: 0.1,
    },
    orbOpacity: 0.6,
    orbRadius: 1.1,
    radius: 1.2,

    // Actions
    createNetwork: () => {
      useVertex.getState().createVertices({
        radius: get().radius,
        vertexNumber: useVertex.getState().vertexNumber,
        vertexPlacementChaosFactor: useVertex.getState().vertexPlacementChaosFactor,
      });

      useRelation.getState().createAdjacencyMap({
        radius: get().radius,
        maxEdgeLengthPercentage: useEdge.getState().maxEdgeLengthPercentage,
        vertices: useVertex.getState().vertices,
      });

      useRelation.getState().createEdgeNeighbours();
    },

    updateOrbColor: (channel: string, newColor: number) => {
      set((state) => {
        return {
          orbColor: {
            ...state.orbColor,
            [channel]: newColor,
          },
        };
      });
    },

    updateOrbOpacity: (newOpacity: number) => {
      set(() => {
        return {
          orbOpacity: newOpacity,
        };
      });
    },

    updateOrbRadius: (newRadius: number) => {
      set(() => {
        return {
          orbRadius: newRadius,
        };
      });
    },
  };
});
