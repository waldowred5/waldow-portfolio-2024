import { VertexModel } from './VertexModel';
import { VertexMap } from '../../store/vertex/types';
import { PLAYER_COLOR } from '../../store/player/types';

interface Props {
  playerColors: PLAYER_COLOR,
  vertices: VertexMap;
}

export const VertexCollection = (
  {
    playerColors,
    vertices
  }: Props) => {
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
