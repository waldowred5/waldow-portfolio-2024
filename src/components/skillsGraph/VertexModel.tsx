import { useEffect, useRef, useState } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vertex } from '../../store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '../../store/player/types';
import { ITheme, THEME_COLORS } from '../../store/theme/types.ts';
import { useThemeState } from '../../store/theme/useThemeState.ts';
import useVertexState from '../../store/vertex/useVertexState.ts';

interface Props {
  playerColors: PLAYER_COLOR,
  vertex: Vertex,
  uuid: string,
}

export const VertexModel = ({ playerColors, vertex, uuid }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Group | null>(null);
  const { owner } = vertex;
  const [currentColor, setCurrentColor] = useState([0, 0, 0]);

  const {
    theme,
  } = useThemeState((state: ITheme) => {
    return {
      theme: state.theme,
    };
  });

  // useEffect(() => {
  //   console.log([
  //     THEME_COLORS[theme].primary[0],
  //     THEME_COLORS[theme].primary[1],
  //     THEME_COLORS[theme].primary[2],
  //   ]);
  //
  //   setCurrentColor([
  //     THEME_COLORS[theme].primary[0] * 0.4,
  //     THEME_COLORS[theme].primary[1] * 0.4,
  //     THEME_COLORS[theme].primary[2] * 0.4,
  //   ]);
  //   // setCurrentColor(playerColors[PLAYER[owner]].vertex);
  // }, [owner]);

  const {
    resetSelectedVertexPosition,
    selectedVertexPosition,
    selectedVertex,
    setSelectedVertexPosition,
    setSelectedVertex,
  } = useVertexState((state) => {
    return {
      resetSelectedVertexPosition: state.resetSelectedVertexPosition,
      selectedVertexPosition: state.selectedVertexPosition,
      selectedVertex: state.selectedVertex,
      setSelectedVertexPosition: state.setSelectedVertexPosition,
      setSelectedVertex: state.setSelectedVertex,
    };
  });

  useFrame((state) => {
    const { camera } = state;

    // @ts-ignore
    textRef.current?.lookAt(camera.position);

    // if (selectedVertex) {
    //   setSelectedVertexPosition(ref.current?.getWorldPosition(new Vector3()) || null);
    // }
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
            // onPointerEnter={() => setCurrentColor(playerColors[PLAYER[owner]].hackBot)}
            // onPointerLeave={() => setCurrentColor(playerColors[PLAYER[owner]].vertex)}
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
              // color={currentColor}
              toneMapped={false}
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
            >
              {vertex.label}
            </Text>
          </group>
        </>
      }
    </>
  );
};
