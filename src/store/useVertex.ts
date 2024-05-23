import { createWithEqualityFn } from 'zustand/traditional';
import { Mesh, Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { PLAYER } from './usePlayer.ts';

export interface ICategories {
  [key: string]: {
    group: string,
    groupNumber: number,
  }
}

export const CATEGORIES: ICategories = {
  LANGUAGES: {
    group: 'LANGUAGES',
    groupNumber: 1
  },
  FRAMEWORKS: {
    group: 'FRAMEWORKS',
    groupNumber: 1
  },
  LIBRARIES: {
    group: 'LIBRARIES',
    groupNumber: 1
  },
  DATABASES: {
    group: 'DATABASES',
    groupNumber: 1
  },
  CLOUD: {
    group: 'CLOUD',
    groupNumber: 2
  },
  AI: {
    group: 'AI',
    groupNumber: 2
  },
  TOOLS: {
    group: 'TOOLS',
    groupNumber: 2
  },
  ARCHITECTURE: {
    group: 'ARCHITECTURE',
    groupNumber: 2
  },
};

export interface ISkill {
  label: string,
  group: string,
  groupNumber: number,
}

export const SKILLS: ISkill[] = [
  { label: 'HTML', ...CATEGORIES.LANGUAGES },
  { label: 'CSS', ...CATEGORIES.LANGUAGES },
  { label: 'JavaScript', ...CATEGORIES.LANGUAGES },
  { label: 'TypeScript', ...CATEGORIES.LANGUAGES },
  { label: 'Node.js', ...CATEGORIES.LANGUAGES },
  { label: 'C#', ...CATEGORIES.LANGUAGES },
  { label: 'Ruby', ...CATEGORIES.LANGUAGES },
  { label: 'Ruby on Rails', ...CATEGORIES.LANGUAGES },
  { label: 'Kotlin', ...CATEGORIES.LANGUAGES },
  { label: 'Java', ...CATEGORIES.LANGUAGES },
  { label: 'React', ...CATEGORIES.FRAMEWORKS },
  { label: 'Vue.js', ...CATEGORIES.FRAMEWORKS },
  { label: 'Next.js', ...CATEGORIES.FRAMEWORKS },
  { label: 'Nuxt.js', ...CATEGORIES.FRAMEWORKS },
  { label: 'Jest', ...CATEGORIES.FRAMEWORKS },
  { label: 'Cypress', ...CATEGORIES.FRAMEWORKS },
  { label: 'Redux', ...CATEGORIES.LIBRARIES },
  { label: 'Vuex', ...CATEGORIES.LIBRARIES },
  { label: 'Zustand', ...CATEGORIES.LIBRARIES },
  { label: 'Electron.js', ...CATEGORIES.LIBRARIES },
  { label: 'Tailwind', ...CATEGORIES.LIBRARIES },
  { label: 'Styled Components', ...CATEGORIES.LIBRARIES },
  { label: 'Storybook', ...CATEGORIES.LIBRARIES },
  { label: 'three.js', ...CATEGORIES.LIBRARIES },
  { label: 'react-three-fiber', ...CATEGORIES.LIBRARIES },
  { label: 'drei', ...CATEGORIES.LIBRARIES },
  { label: 'AWS', ...CATEGORIES.CLOUD },
  { label: 'GCP (Certified)', ...CATEGORIES.CLOUD },
  { label: 'S3', ...CATEGORIES.CLOUD },
  { label: 'Firebase', ...CATEGORIES.CLOUD },
  { label: 'EC2', ...CATEGORIES.CLOUD },
  { label: 'Cloud Functions', ...CATEGORIES.CLOUD },
  { label: 'Lambda', ...CATEGORIES.CLOUD },
  { label: 'Cloud Tasks', ...CATEGORIES.CLOUD },
  { label: 'Alexa SDK', ...CATEGORIES.CLOUD },
  { label: 'Cloud Run', ...CATEGORIES.CLOUD },
  { label: 'OpenAI SDK', ...CATEGORIES.AI },
  { label: 'Vertex AI', ...CATEGORIES.AI },
  { label: 'Firestore', ...CATEGORIES.DATABASES },
  { label: 'DynamoDB', ...CATEGORIES.DATABASES },
  { label: 'MongoDB', ...CATEGORIES.DATABASES },
  { label: 'PostgreSQL', ...CATEGORIES.DATABASES },
  { label: 'Git', ...CATEGORIES.TOOLS },
  { label: 'GitHub', ...CATEGORIES.TOOLS },
  { label: 'Docker', ...CATEGORIES.TOOLS },
  { label: 'Jenkins', ...CATEGORIES.TOOLS },
  { label: 'Kafka', ...CATEGORIES.TOOLS },
  { label: 'Webpack', ...CATEGORIES.TOOLS },
  { label: 'Vite', ...CATEGORIES.TOOLS },
  { label: 'Maven', ...CATEGORIES.TOOLS },
  { label: 'Contentful', ...CATEGORIES.TOOLS },
  { label: 'Contentstack', ...CATEGORIES.TOOLS },
  { label: 'SPAs', ...CATEGORIES.ARCHITECTURE },
  { label: 'APIs', ...CATEGORIES.ARCHITECTURE },
  { label: 'Serverless', ...CATEGORIES.ARCHITECTURE },
  { label: 'Microservices', ...CATEGORIES.ARCHITECTURE },
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
  vertexRefs: { [key: string]: Mesh },

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
  setVertexRef: (ref: Mesh) => void,
  updateVertexNumber: (newVertexNumber: number) => void,
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
}

export const useVertex = createWithEqualityFn<VertexState>((set) => {
  return {
    vertexNumber: SKILLS.length,
    vertexPlacementChaosFactor: 260,
    vertices: {},
    selectedVertexPosition: null,
    selectedVertex: null,
    vertexRefs: {},

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
                label: SKILLS[index].label,
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

    setSelectedVertex: (vertex) => {
      set(() => {
        return {
          selectedVertex: vertex || null,
          selectedVertexPosition: vertex?.getWorldPosition(new Vector3()) || null,
        };
      });
    },

    setSelectedVertexPosition: (position) => {
      set(() => {
        return {
          selectedVertexPosition: position,
        };
      });
    },

    setVertexRef: (ref) => {
      set((state) => {
        return {
          vertexRefs: {
            ...state.vertexRefs,
            [ref.name]: ref,
          }
        };
      });
    },

    updateVertexNumber: (newVertexNumber) => {
      set(() => {
        return {
          vertexNumber: newVertexNumber,
        };
      });
    },

    updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor) => {
      set(() => {
        return {
          vertexPlacementChaosFactor: newVertexPlacementChaosFactor,
        };
      });
    },
  };
});
