import { VertexModel } from './VertexModel';
import { VertexMap } from '../../store/useVertex.ts';
import { PLAYER_COLOR } from '../../store/usePlayer.ts';
import { useFrame } from '@react-three/fiber';
import { useVertex } from '../../store/useVertex.ts';
import { Vector3 } from 'three';

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
  } = useVertex((state) => {
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
