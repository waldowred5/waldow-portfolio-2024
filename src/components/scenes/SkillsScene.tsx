import { SkillsGraph } from '../skillsGraph/SkillsGraph.tsx';
import { useScroll } from '../../store/useScroll.ts';
import { useSkillsGraph } from '../../store/useSkillsGraph.ts';
import { useEffect } from 'react';
import { useVertex } from '../../store/useVertex.ts';
import { useEdge } from '../../store/useEdge.ts';
import { Text } from '@react-three/drei';
import { useClamp } from '../../hooks/useClamp.ts';

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
      {
        scrollPercentage > 0.85 && <group
          position={[0, -0.2, scrollPercentage - 3.2]}
        >
          <mesh
            position={[0, 0.1, 2]}
          >
            <planeGeometry args={[1.25, 1.25]}/>
            <meshBasicMaterial
              color="black"
              transparent={true}
              opacity={1 - useClamp((scrollPercentage * 8) - 7, 0, 1)}
            />
          </mesh>

          <Text
            font="./fonts/Kanit-Bold.ttf"
            fontSize={0.2}
            position={[0, 1.25, 1]}
            color="white"
          >
            SKILLS
          </Text>
          <SkillsGraph/>
        </group>
      }
    </>
  );
};
