import { Color, CylinderGeometry, Mesh } from 'three';
// import vertexShader from '../../assets/shaders/edge/vertex.glsl?raw';
// import fragmentShader from '../../assets/shaders/edge/fragment.glsl?raw';
import { Vertex } from '../../store/useVertex.ts';
import { useTheme } from '../../store/useTheme.ts';
import { ITheme, THEME_COLORS } from '../../store/useTheme.ts';
import { useEffect, useRef } from 'react';

interface Props {
  fromVertex: Vertex;
  toVertex: Vertex;
}

export const Edge = (
  {
    fromVertex,
    toVertex,
  }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const geomRef = useRef<CylinderGeometry | null>(null);

  const {
    theme
  } = useTheme((state: ITheme) => {
    return {
      theme: state.theme,
    };
  });

  const distance = fromVertex.vector.distanceTo(toVertex.vector);

  useEffect(() => {
    geomRef.current?.translate(0, distance / 2, 0);
    geomRef.current?.rotateX(Math.PI / 2);
    ref.current?.position.copy(toVertex.vector);
    ref.current?.lookAt(fromVertex.vector);
  }, []);

  const cylinderRadius = 0.01;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  return (
    <>
      <mesh
        ref={ref}
      >
        <cylinderGeometry
          ref={geomRef}
          args={[
            cylinderRadius,
            cylinderRadius,
            distance,
            cylinderTesselation.radial,
            cylinderTesselation.length
          ]}
        />
        <meshBasicMaterial
          color={new Color(...THEME_COLORS[theme].tertiary)}
        />
      </mesh>
    </>
  );
};
