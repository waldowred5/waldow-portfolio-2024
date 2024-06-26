import { SkillsGraph } from '../skillsGraph/SkillsGraph.tsx';
import { useSkillsGraph } from '../../store/useSkillsGraph.ts';
import { useEffect, useState } from 'react';
import { useEdge } from '../../store/useEdge.ts';
import { Text } from '@react-three/drei';
import { useClamp } from '../../hooks/useClamp.ts';
import { useWindowSize } from '../../store/useWindowSize.ts';
import { useScroll } from '../../store/useScroll.ts';
import { useVertex } from '../../store/useVertex.ts';

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

  const {
    innerWidth,
  } = useWindowSize((state) => {
    return {
      innerWidth: state.innerWidth,
    };
  });

  const [planeSize, setPlaneSize] = useState<[number, number]>([0, 0]);
  const [scrollThreshold, setScrollThreshold] = useState<number>(0);

  useEffect(() => {
    if (innerWidth < 768) {
      setPlaneSize([2.5, 2.5]);
      setScrollThreshold(0.84);
    } else {
      setPlaneSize([1.55, 1.55]);
      setScrollThreshold(0.78);
    }
  }, [innerWidth]);

  // Init Vertices
  useEffect(() => {
    createNetwork();
  }, [vertexNumber, vertexPlacementChaosFactor, maxEdgeLengthPercentage]);

  return (
    <>
      {
        scrollPercentage > scrollThreshold && <group
          position={[0, 0, 0]}
        >
          <mesh
            position={[0, 0, 2]}
          >
            <planeGeometry args={planeSize}/>
            <meshBasicMaterial
              color="black"
              transparent={true}
              opacity={1 - useClamp((scrollPercentage * 7) - 6, 0, 1)}
            />
          </mesh>

          {
            innerWidth < 768 ?
              <Text
                font="./fonts/Kanit-Bold.ttf"
                fontSize={0.35}
                position={[0, 1.5, 1]}
                color="white"
                outlineColor="black"
                outlineWidth={0.01}
              >
                SKILLS
              </Text> :
              <Text
                font="./fonts/Kanit-Bold.ttf"
                fontSize={0.2}
                position={[0, 1.25, 1]}
                color="white"
                outlineColor="black"
                outlineWidth={0.01}
              >
                SKILLS
              </Text>
          }


          <SkillsGraph/>

          {
            innerWidth < 768 ?
              <Text
                font="./fonts/Kanit-Bold.ttf"
                fontSize={0.15}
                position={[0, -1.55, 1]}
                color="white"
                outlineColor="black"
                outlineWidth={0.01}
                textAlign={'center'}
              >
                {`Tap on a skill bubble to\ncenter it on the screen`}
              </Text> :
              <Text
                font="./fonts/Kanit-Bold.ttf"
                fontSize={0.08}
                position={[0, -1.25, 1]}
                color="white"
                outlineColor="black"
                outlineWidth={0.01}
              >
                {
                  innerWidth < 1024 ?
                    `Tap on a skill bubble to center it on the screen` :
                    `Click on a skill from the list to center it on the screen`
                }
              </Text>
          }
        </group>
      }
    </>
  );
};
