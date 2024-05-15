import { useEffect, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vertex } from '../../store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '../../store/player/types';

interface Props {
  playerColors: PLAYER_COLOR,
  vertex: Vertex,
  uuid: string,
}

export const VertexModel = ({ playerColors, vertex, uuid }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Group | null>(null);
  const { owner } = vertex;
  const [currentColor, setCurrentColor] = useState();

  useEffect(() => {
    setCurrentColor(playerColors[PLAYER[owner]].vertex);
  }, [owner]);

  useFrame((state) => {
    const { camera } = state;

    // @ts-ignore
    textRef.current?.lookAt(camera.position);
  });

  return (
    <>
      {
        <>
          <mesh
            ref={ref}
            position={vertex.vector}
            onPointerEnter={() => setCurrentColor(playerColors[PLAYER[owner]].hackBot)}
            onPointerLeave={() => setCurrentColor(playerColors[PLAYER[owner]].vertex)}
          >
            <sphereGeometry args={[0.06, 32, 32]}/>
            <meshBasicMaterial
              color={currentColor}
              toneMapped={false}
            />
          </mesh>
          <group
            ref={textRef}
            position={[
              vertex.vector.x * 1.08,
              vertex.vector.y * 1.08,
              vertex.vector.z * 1.08,
            ]}>
            <Text
              font="./src/assets/fonts/Kanit-Bold.ttf"
              fontSize={0.06}
            >
              {uuid.substring(0, 4)}
            </Text>
          </group>
        </>
      }
    </>
  );
};
