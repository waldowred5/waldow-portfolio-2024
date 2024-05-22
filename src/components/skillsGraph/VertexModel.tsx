import { useRef } from 'react';
import { Color, Group, Mesh } from 'three';
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
            onClick={() => setSelectedVertex(ref.current)}
          >
            <sphereGeometry args={[0.06, 32, 32]}/>
            <meshBasicMaterial
              color={new Color(...THEME_COLORS[theme].primary)}
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
            <Text
              font="./fonts/Kanit-Bold.ttf"
              fontSize={0.06}
              outlineWidth={0.005}
              outlineColor="black"
              textAlign="center"
            >
              {vertex.label}
            </Text>
          </group>
        </>
      }
    </>
  );
};
