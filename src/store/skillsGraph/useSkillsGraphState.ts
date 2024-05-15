import { createWithEqualityFn } from 'zustand/traditional';
import { SkillsGraphState } from './types';
import useVertexState from '../vertex/useVertexState';
import useRelationState from '../relation/useRelationState';
import useEdgeState from '../edge/useEdgeState';

export default createWithEqualityFn<SkillsGraphState>((set, get) => {
  return {
    orbColor: {
      red: 0.0,
      green: 0.0,
      blue: 0.0,
    },
    orbOpacity: 0.99,
    orbRadius: 1,
    radius: 1.2,

    // Actions
    createNetwork: () => {
      useVertexState.getState().createVertices({
        radius: get().radius,
        vertexNumber: useVertexState.getState().vertexNumber,
        vertexPlacementChaosFactor: useVertexState.getState().vertexPlacementChaosFactor,
      });

      useRelationState.getState().createAdjacencyMap({
        radius: get().radius,
        maxEdgeLengthPercentage: useEdgeState.getState().maxEdgeLengthPercentage,
        vertices: useVertexState.getState().vertices,
      });

      useRelationState.getState().createEdgeNeighbours();
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
    }
  };
});
