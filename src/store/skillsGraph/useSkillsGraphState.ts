import { createWithEqualityFn } from 'zustand/traditional';
import { SkillsGraphState } from './types';
import useVertexState from '../vertex/useVertexState';
import useRelationState from '../relation/useRelationState';
import useEdgeState from '../edge/useEdgeState';

export default createWithEqualityFn<SkillsGraphState>((set, get) => {
  return {
    orbColor: {
      red: 0.6,
      green: 0.6,
      blue: 0.6,
    },
    orbOpacity: 0.59,
    orbRadius: 1,
    radius: 1.2,
    statsDebugPanelEnabled: true,

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
    },

    updateStatsDebugPanelEnabled: (statsDebugPanelEnabled: boolean) => {
      set({
        statsDebugPanelEnabled,
      });
    }
  };
});
