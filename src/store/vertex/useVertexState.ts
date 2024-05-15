import { createWithEqualityFn } from 'zustand/traditional';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { VertexMap, VertexState } from './types';
import { PLAYER } from '../player/types';
// import usePlayerState from '../player/usePlayerState';

export default createWithEqualityFn<VertexState>((set) => {
  return {
    vertexNumber: 30,
    vertexPlacementChaosFactor: 350,
    vertices: {},

    // Actions
    createVertices: (
      {
        radius,
        vertexPlacementChaosFactor,
        vertexNumber,
      }
    ) => {
      console.log('Generating Vertex Sphere Vectors...');
      // Re-implementation of fibonacci lattice algorithm

      set(() => {
        const offset = 2 / vertexNumber;
        const increment = Math.PI * (3 - Math.sqrt(5));

        const vertices: VertexMap = Array.from(Array(vertexNumber)).reduce((
            acc: VertexMap,
            _,
            index
          ) => {
            const chaosLevel = 1 + Math.random() *
              vertexPlacementChaosFactor / vertexNumber / 1000;
            const yMod = ((index * offset) - 1) + (offset / 2);
            const distance = Math.sqrt(1 - Math.pow(yMod, 2));
            const phi = ((index + 1) % vertexNumber) * increment * chaosLevel;
            const zMod = Math.sin(phi) * distance;
            const xMod = Math.cos(phi) * distance;
            const x = xMod * radius;
            const y = yMod * radius;
            const z = zMod * radius;

            const uuid = uuidv4();

            return {
              ...acc,
              [uuid]: {
                vector: new Vector3(x, y, z),
                owner: PLAYER.NEUTRAL,
                uuid,
              },
            };
          }, {}
        );

        return {
          vertices,
        };
      });
    },

    updateVertexNumber: (newVertexNumber: number) => {
      set(() => {
        return {
          vertexNumber: newVertexNumber,
        };
      });
    },

    updateVertexOwner: (vertexId: string, newVertexOwner: keyof typeof PLAYER) => {
      set((state) => {
        return {
          vertices: {
            ...state.vertices,
            [vertexId]: {
              ...state.vertices[vertexId],
              owner: newVertexOwner,
            }
          },
        };
      });
    },

    updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => {
      set(() => {
        return {
          vertexPlacementChaosFactor: newVertexPlacementChaosFactor,
        };
      });
    },
  };
});
