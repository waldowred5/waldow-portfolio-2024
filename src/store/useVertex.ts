import { createWithEqualityFn } from 'zustand/traditional';
import { Mesh, Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { PLAYER } from './usePlayer.ts';

const SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Electron.js',
  'Next.js',
  'Zustand',
  'Vue.js',
  'Vuex',
  'Nuxt.js',
  'Tailwind CSS',
  'Styled\nComponents',
  'Node.js',
  'three.js',
  'GCP\n(Certified)',
  'Firebase',
  'Firestore',
  'GCP\nCloud Functions',
  'Vertex AI',
  'AWS',
  'Lambda',
  'DynamoDB',
  'Docker',
  'Ruby',
  'Rails',
  'MongoDB',
  'PostgreSQL',
  'Git',
  'GitHub',
  'CI/CD',
  'Jenkins',
  'Jest',
  'Cypress',
  'Serverless',
  'Kotlin',
  'Java',
  'Kafka',
  'Microservices',
];

export type Vertex = {
  vector: Vector3,
  hackBotId: string | null,
  owner: keyof typeof PLAYER,
  uuid: string,
  label: string,
}

export interface VertexMap {
  [key: string]: Vertex,
}

interface GenerateVerticesProps {
  radius: number,
  vertexPlacementChaosFactor: number,
  vertexNumber: number,
}

export interface VertexState {
  vertexNumber: number,
  vertexPlacementChaosFactor: number,
  vertices: VertexMap,
  selectedVertexPosition: Vector3 | null,
  selectedVertex: Mesh | null,

  // Actions
  createVertices: (
    {
      radius,
      vertexPlacementChaosFactor,
      vertexNumber,
    }: GenerateVerticesProps
  ) => void,
  resetSelectedVertexPosition: () => void,
  setSelectedVertex: (vertex: Mesh | null) => void,
  setSelectedVertexPosition: (position: Vector3 | null) => void,
  updateVertexNumber: (newVertexNumber: number) => void,
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
}


export const useVertex = createWithEqualityFn<VertexState>((set) => {
  return {
    vertexNumber: SKILLS.length,
    vertexPlacementChaosFactor: 350,
    vertices: {},
    selectedVertexPosition: null,
    selectedVertex: null,

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
                label: SKILLS[index],
              },
            };
          }, {}
        );

        return {
          vertices,
        };
      });
    },

    resetSelectedVertexPosition: () => {
      console.log('position reset')

      set(() => {
        return {
          selectedVertex: null,
          selectedVertexPosition: null,
        };
      });
    },

    setSelectedVertex: (vertex: Mesh | null) => {
      set(() => {
        return {
          selectedVertex: vertex || null,
          selectedVertexPosition: vertex?.getWorldPosition(new Vector3()) || null,
        };
      });
    },

    setSelectedVertexPosition: (position: Vector3 | null) => {
      set(() => {
        return {
          selectedVertexPosition: position,
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

    updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => {
      set(() => {
        return {
          vertexPlacementChaosFactor: newVertexPlacementChaosFactor,
        };
      });
    },
  };
});
