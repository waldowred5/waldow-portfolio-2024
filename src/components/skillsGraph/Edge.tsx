import { CylinderGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import vertexShader from '../../assets/shaders/edge/vertex.glsl?raw';
import fragmentShader from '../../assets/shaders/edge/fragment.glsl?raw';
import { Vertex } from '../../store/useVertex.ts';
import { PLAYER, PLAYER_COLOR } from '../../store/usePlayer.ts';
import { useTheme } from '../../store/useTheme.ts';
import { ITheme, THEME_COLORS } from '../../store/useTheme.ts';
import { useScroll } from '../../store/useScroll.ts';

interface Props {
  fromVertex: Vertex;
  fromVertexOwnershipPercentage: number;
  toVertex: Vertex;
  toVertexOwnershipPercentage: number;
  playerColors: PLAYER_COLOR;
}

export const Edge = (
  {
    fromVertex,
    fromVertexOwnershipPercentage,
    toVertex,
    toVertexOwnershipPercentage,
    playerColors
  }: Props) => {
  const {
    scrollPercentage,
  } = useScroll((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  const cylinderRadius = 0.01;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const distance = fromVertex.vector.distanceTo(toVertex.vector);
  const cylinderGeom = new CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    distance,
    cylinderTesselation.radial,
    cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 2, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const getColor = (player: PLAYER) => {
    // TODO: Object key access
    // TODO: Clean this up
    return new Vector3(
      playerColors[player]['edge'][0],
      playerColors[player]['edge'][1],
      playerColors[player]['edge'][2],
    );
  };

  const { theme } = useTheme((state: ITheme) => {
    return {
      theme: state.theme,
    };
  });

  const cylinderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uOpacity: { value: scrollPercentage },
      uCylinderColorBase: { value: getColor(PLAYER.NEUTRAL) },
      uCylinderColorFromVertex: {
        value: new Vector3(
          THEME_COLORS[theme].tertiary[0],
          THEME_COLORS[theme].tertiary[1],
          THEME_COLORS[theme].tertiary[2],
        )
      },
      // uCylinderColorFromVertex: { value: getColor(PLAYER[fromVertex.owner]) },
      uCylinderColorToVertex: {
        value: new Vector3(
          THEME_COLORS[theme].tertiary[0],
          THEME_COLORS[theme].tertiary[1],
          THEME_COLORS[theme].tertiary[2],
        )
      },
      // uCylinderColorToVertex: { value: getColor(PLAYER[toVertex.owner]) },
      uCylinderDistance: { value: distance },
      uFromVertexOwnershipPercentage: { value: fromVertexOwnershipPercentage },
      uToVertexOwnershipPercentage: { value: toVertexOwnershipPercentage },
    }
  });

  const cylinder = new Mesh(
    cylinderGeom,
    cylinderMaterial,
  );

  cylinder.position.copy(toVertex.vector);
  cylinder.lookAt(fromVertex.vector);

  return (
    <>
      <primitive
        object={cylinder}
      />
    </>
  );
};
