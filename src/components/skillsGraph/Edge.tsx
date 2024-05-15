import { CylinderGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import vertexShader from '../../assets/shaders/cylinders/vertex.glsl?raw';
import fragmentShader from '../../assets/shaders/cylinders/fragment.glsl?raw';
import { Vertex } from '../../store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '../../store/player/types';

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

  const cylinderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uCylinderColorBase: { value: getColor(PLAYER.NEUTRAL) },
      uCylinderColorFromVertex: { value: getColor(PLAYER[fromVertex.owner]) },
      uCylinderColorToVertex: { value: getColor(PLAYER[toVertex.owner]) },
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
