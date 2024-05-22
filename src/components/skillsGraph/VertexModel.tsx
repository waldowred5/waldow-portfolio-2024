import { useRef } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vertex } from '../../store/useVertex.ts';
import { useTheme, ITheme, THEME_COLORS } from '../../store/useTheme.ts';
import { useVertex } from '../../store/useVertex.ts';
import { useScroll } from '../../store/useScroll.ts';

interface Props {
  vertex: Vertex,
}

export const VertexModel = ({ vertex }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Group | null>(null);

  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  const {
    theme,
  } = useTheme((state: ITheme) => {
    return {
      theme: state.theme,
    };
  });

  const {
    resetSelectedVertexPosition,
    setSelectedVertex,
  } = useVertex((state) => {
    return {
      resetSelectedVertexPosition: state.resetSelectedVertexPosition,
      setSelectedVertex: state.setSelectedVertex,
    };
  });

  useFrame((state) => {
    const { camera } = state;

    textRef.current?.lookAt(camera.position);
  });

  return (
    <>
      {
        <>
          <mesh
            ref={ref}
            position={vertex.vector}
            onClick={() => {
              resetSelectedVertexPosition();
              setSelectedVertex(ref.current);
              console.log('Vertex', {
                position: ref.current?.getWorldPosition(new Vector3()),
                distance: ref.current?.getWorldPosition(new Vector3()).distanceTo(new Vector3(0, 0, -1)),
              })
            }}
          >
            <sphereGeometry args={[0.06, 32, 32]}/>
            <meshBasicMaterial
              color={
                [
                  THEME_COLORS[theme].primary[0],
                  THEME_COLORS[theme].primary[1],
                  THEME_COLORS[theme].primary[2],
                ]
              }
              transparent={true}
              opacity={Math.min(Math.max((scrollPercentage * 6) - 5, 0), 1)}
            />
          </mesh>
          <group
            ref={textRef}
            position={[
              vertex.vector.x * 1.12,
              vertex.vector.y * 1.12,
              vertex.vector.z * 1.12,
            ]}>
            { scrollPercentage > 0.98 && <Text
              font="./fonts/Kanit-Bold.ttf"
              fontSize={0.06}
              outlineWidth={0.005}
              outlineColor="black"
            >
              {vertex.label}
            </Text> }
          </group>
        </>
      }
    </>
  );
};
