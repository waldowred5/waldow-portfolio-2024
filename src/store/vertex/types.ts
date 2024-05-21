import { Vector3 } from 'three';
import { PLAYER } from '../player/types';

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

  // Actions
  createVertices: (
    {
      radius,
      vertexPlacementChaosFactor,
      vertexNumber,
    }: GenerateVerticesProps
  ) => void,
  // handleHackBotCreation: (vertexId: string) => void,
  // handleHackBotDeletion: (vertexId: string) => void,
  resetSelectedVertexPosition: () => void,
  setSelectedVertexPosition: (position: Vector3 | null) => void,
  updateVertexNumber: (newVertexNumber: number) => void,
  updateVertexOwner: (vertexId: string, newVertexOwner: keyof typeof PLAYER) => void,
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
}
