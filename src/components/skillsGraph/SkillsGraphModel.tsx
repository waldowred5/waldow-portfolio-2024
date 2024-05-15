import { Suspense } from 'react';
import { Orb } from './Orb';
import { EdgeCollection } from './EdgeCollection';
import { VertexCollection } from './VertexCollection';
import { EdgeNeighbours } from '../../store/relation/types';
import { PLAYER_COLOR } from '../../store/player/types';
import { VertexMap } from '../../store/vertex/types';

interface Props {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  }
  edgeNeighbours: EdgeNeighbours,
  playerColors?: PLAYER_COLOR,
  orbOpacity: number,
  orbRadius: number,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: VertexMap,
}

export const SkillsGraphModel = (
  {
    orbColor,
    edgeNeighbours,
    playerColors,
    orbOpacity,
    updateOrbOpacity,
    orbRadius,
    updateOrbColor,
    updateOrbRadius,
    vertices,
  }: Props) => {
  return (
    <>
      <Orb
        orbColor={orbColor}
        orbOpacity={orbOpacity}
        orbRadius={orbRadius}
        updateOrbColor={updateOrbColor}
        updateOrbOpacity={updateOrbOpacity}
        updateOrbRadius={updateOrbRadius}
      />

      <VertexCollection
        playerColors={playerColors}
        vertices={vertices}
      />

      <Suspense fallback={null}>
        <EdgeCollection
          edgeNeighbours={edgeNeighbours}
          playerColors={playerColors}
          vertices={vertices}
        />
      </Suspense>
    </>
  );
};
