import { VertexModel } from './VertexModel';
import { VertexMap } from '../../store/vertex/types';
import { PLAYER_COLOR } from '../../store/player/types';
import { useFrame } from '@react-three/fiber';
import useVertexState from '../../store/vertex/useVertexState.ts';
import { Vector3 } from 'three';
import { Suspense, useRef } from 'react';
import { Instances } from '@react-three/drei';
import useScrollState from '../../store/scroll/useScrollState.ts';

interface Props {
  playerColors: PLAYER_COLOR,
  vertices: VertexMap;
}

export const VertexCollection = (
  {
    playerColors,
    vertices
  }: Props) => {
  const {
    selectedVertex,
    setSelectedVertexPosition,
  } = useVertexState((state) => {
    return {
      selectedVertex: state.selectedVertex,
      setSelectedVertexPosition: state.setSelectedVertexPosition,
    };
  });

  useFrame(() => {
    if (selectedVertex) {
      setSelectedVertexPosition(selectedVertex?.getWorldPosition(new Vector3()) || null);
    }
  });

  return (
    <>
      {
        Object.entries(vertices).map((vertex) => {
          return (
            <group
              key={`Vertex: ${vertex[0]}`}
            >
              <VertexModel
                playerColors={playerColors}
                vertex={vertex[1]}
                uuid={vertex[0]}
              />
            </group>
          );
        })
      }
    </>
  );
};
