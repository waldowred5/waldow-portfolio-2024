import { SkillsGraph } from '../skillsGraph/SkillsGraph.tsx';
import { useScroll } from '../../store/useScroll.ts';
import { useSkillsGraph } from '../../store/useSkillsGraph.ts';
import { useEffect } from 'react';
import { useVertex } from '../../store/useVertex.ts';
import { useEdge } from '../../store/useEdge.ts';

export const SkillsScene = () => {
  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  const {
    createNetwork,
  } = useSkillsGraph((state) => {
    return {
      createNetwork: state.createNetwork,
    };
  });

  const {
    vertexNumber,
    vertexPlacementChaosFactor,
  } = useVertex((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
    };
  });

  const {
    maxEdgeLengthPercentage,
  } = useEdge((state) => {
    return {
      maxEdgeLengthPercentage: state.maxEdgeLengthPercentage,
    };
  });

  // Init Vertices
  useEffect(() => {
    createNetwork();
  }, [vertexNumber, vertexPlacementChaosFactor, maxEdgeLengthPercentage]);

  return (
    <>
      <group
        position={[0, 0, scrollPercentage - 3]}
      >
        { scrollPercentage > 0.8 && <SkillsGraph/> }
      </group>
    </>
  );
};
