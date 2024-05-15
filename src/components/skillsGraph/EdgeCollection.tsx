import { Edge } from './Edge';
import { EdgeNeighbours } from '../../store/relation/types';
import { PLAYER_COLOR } from '../../store/player/types';
import { Vertex, VertexMap } from '../../store/vertex/types';
import useRelationState from '../../store/relation/useRelationState';
import { useThemeState } from '../../store/theme/useThemeState.ts';
import { ITheme } from '../../store/theme/types.ts';

interface Props {
  edgeNeighbours: EdgeNeighbours;
  playerColors: PLAYER_COLOR;
  vertices: VertexMap;
}

export const EdgeCollection = ({ edgeNeighbours, playerColors, vertices }: Props) => {
  const { contestProgress } = useRelationState((state) => ({
    contestProgress: state.contestProgress,
  }));

  return (
    <group>
      {
        Object.keys(edgeNeighbours).map((edgeNeighbour) => {
          if (!vertices[edgeNeighbours[edgeNeighbour].fromVertexId]) {
            return null;
          }

          const fromVertex: Vertex = vertices[edgeNeighbours[edgeNeighbour].fromVertexId];
          const { x: x1, y: y1, z: z1 } = fromVertex.vector;
          const toVertex: Vertex = vertices[edgeNeighbours[edgeNeighbour].toVertexId];
          const { x: x2, y: y2, z: z2 } = toVertex.vector;

          return (
            <Edge
              key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
              fromVertex={fromVertex}
              fromVertexOwnershipPercentage={contestProgress}
              // fromVertexOwnershipPercentage={edgeNeighbours[edgeNeighbour].contest.fromVertex} // TODO: Put this back when contest is working
              toVertex={toVertex}
              toVertexOwnershipPercentage={contestProgress}
              // toVertexOwnershipPercentage={edgeNeighbours[edgeNeighbour].contest.toVertex} // TODO: Put this back when contest is working
              playerColors={playerColors}
            />
          );
        })
      }
    </group>
  );
};
