import { useRef } from 'react';
import { Group } from 'three';
import { folder, useControls } from 'leva';

interface Props {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  },
  orbOpacity: number,
  orbRadius: number,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
}

export const Orb = ({ orbColor, orbOpacity, orbRadius, updateOrbColor, updateOrbRadius, updateOrbOpacity }: Props) => {
  const ref = useRef<Group | null>(null);

  // Debug
  useControls('Orb', {
    opacity: {
      value: orbOpacity,
      min: 0,
      max: 1,
      onChange: (value: number) => {
        updateOrbOpacity(value);
      }
    },
    radius: {
      value: orbRadius,
      min: 0,
      max: 5,
      onChange: (value: number) => {
        updateOrbRadius(value);
      }
    },
    color: folder({
      red: {
        value: orbColor.red,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('red', value);
        }
      },
      green: {
        value: orbColor.green,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('green', value);
        }
      },
      blue: {
        value: orbColor.blue,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('blue', value);
        }
      }
    })
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[orbRadius, 32, 32]}/>
        <meshBasicMaterial
          color={[orbColor.red, orbColor.green, orbColor.blue]}
          transparent={true}
          opacity={orbOpacity}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
