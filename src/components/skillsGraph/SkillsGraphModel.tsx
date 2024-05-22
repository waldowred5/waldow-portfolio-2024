import { Suspense, useEffect } from 'react';
import { Orb } from './Orb';
import { EdgeCollection } from './EdgeCollection';
import { VertexCollection } from './VertexCollection';
import { EdgeNeighbours } from '../../store/useRelation.ts';
import { useVertex, VertexMap } from '../../store/useVertex.ts';

interface Props {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  }
  edgeNeighbours: EdgeNeighbours,
  orbOpacity: number,
  orbRadius: number,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: VertexMap,
}

export const SkillsGraphModel = (
  {
    edgeNeighbours,
    orbColor,
    orbOpacity,
    orbRadius,
    updateOrbOpacity,
    updateOrbColor,
    updateOrbRadius,
    vertices,
  }: Props) => {
  const {
    resetSelectedVertexPosition,
  } = useVertex((state) => {
    return {
      resetSelectedVertexPosition: state.resetSelectedVertexPosition,
    };
  });

  useEffect(() => {
    resetSelectedVertexPosition();
    console.log('SkillsGraphModel Re-rendered!');
  }, []);

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
        vertices={vertices}
      />

      <Suspense fallback={null}>
        <EdgeCollection
          edgeNeighbours={edgeNeighbours}
          vertices={vertices}
        />
      </Suspense>
    </>
  );
};
