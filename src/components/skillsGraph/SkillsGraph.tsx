import { Suspense, useEffect, useRef } from 'react';
import { folder, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEdge } from '../../store/useEdge.ts';
import { useRelation } from '../../store/useRelation.ts';
import { useSkillsGraph } from '../../store/useSkillsGraph.ts';
import { useVertex } from '../../store/useVertex.ts';
import { SkillsGraphModel } from './SkillsGraphModel.tsx';
import { Vector3 } from 'three';

export const SkillsGraph = () => {
  const body = useRef<RapierRigidBody | null>(null);
  const [, getKeys] = useKeyboardControls();

  const {
    maxEdgeLengthPercentage,
    updateMaxEdgeLengthPercentage,
  } = useEdge((state) => {
    return {
      maxEdgeLengthPercentage: state.maxEdgeLengthPercentage,
      updateMaxEdgeLengthPercentage: state.updateMaxEdgeLengthPercentage,
    };
  });

  const {
    orbColor,
    orbOpacity,
    orbRadius,
    updateOrbColor,
    updateOrbOpacity,
    updateOrbRadius,
  } = useSkillsGraph((state) => {
    return {
      orbColor: state.orbColor,
      orbOpacity: state.orbOpacity,
      orbRadius: state.orbRadius,
      updateOrbColor: state.updateOrbColor,
      updateOrbOpacity: state.updateOrbOpacity,
      updateOrbRadius: state.updateOrbRadius,
    };
  });

  const {
    edgeNeighbours,
    contestProgress,
    updateContestProgress,
  } = useRelation((state) => {
    return {
      edgeNeighbours: state.edgeNeighbours,
      contestProgress: state.contestProgress,
      updateContestProgress: state.updateContestProgress,
    };
  });

  const {
    vertexNumber,
    vertices,
    selectedVertex,
    selectedVertexPosition,
    updateVertexPlacementChaosFactor,
    updateVertexNumber,
  } = useVertex((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertices: state.vertices,
      selectedVertex: state.selectedVertex,
      selectedVertexPosition: state.selectedVertexPosition,
      updateVertexPlacementChaosFactor: state.updateVertexPlacementChaosFactor,
      updateVertexNumber: state.updateVertexNumber,
    };
  });

  // Debug
  useControls('Skills Graph', {
    edge: folder({
      maxLengthPercentage: {
        value: maxEdgeLengthPercentage,
        min: 0,
        max: 1,
        onChange: (value: number) => {
          updateMaxEdgeLengthPercentage(value);
        }
      },
      contestProgress: {
        value: contestProgress,
        min: 0,
        max: 0.5,
        step: 0.01,
        onChange: (value: number) => {
          updateContestProgress(value);
        }
      }
    }),
    vertex: folder({
      number: {
        value: vertexNumber,
        min: 0,
        max: 250,
        step: 1,
        onChange: (value: number) => {
          updateVertexNumber(value);
        }
      },
      placementChaosFactor: {
        value: 350,
        min: 0,
        max: 1000,
        onChange: (value: number) => {
          updateVertexPlacementChaosFactor(value);
        }
      }
    }),
  });

  // Rotate Orb on Keypress
  useFrame((_, delta) => {
    const {
      upward,
      downward,
      leftward,
      rightward
    } = getKeys();

    const torque = {
      x: 0,
      y: 0,
      z: 0
    };
    const torqueStrength = 1000 * delta;

    if (selectedVertex && selectedVertexPosition) {
      const torqueStrengthModifier = 0.02;
      const distanceStrengthModifier = 2.2;
      const directionStrengthModifier = 2.2;
      const locus = selectedVertexPosition.distanceTo(new Vector3(0, 0, 1.3)) * distanceStrengthModifier;
      const yStrengthModifier = Math.abs(selectedVertexPosition.y) * directionStrengthModifier;
      const xStrengthModifier = Math.abs(selectedVertexPosition.x) * directionStrengthModifier;

      if (selectedVertexPosition.y > 0) {
        torque.x += torqueStrength * torqueStrengthModifier * locus * yStrengthModifier;
      }

      if (selectedVertexPosition.y < 0) {
        torque.x -= torqueStrength * torqueStrengthModifier * locus * yStrengthModifier;
      }

      if (selectedVertexPosition.x < 0) {
        torque.y += torqueStrength * torqueStrengthModifier * locus * xStrengthModifier;
      }

      if (selectedVertexPosition.x > 0) {
        torque.y -= torqueStrength * torqueStrengthModifier * locus * xStrengthModifier;
      }
    }

    if (upward) {
      torque.x += torqueStrength * 0.4;
    }

    if (downward) {
      torque.x -= torqueStrength * 0.4;
    }

    if (leftward) {
      torque.y += torqueStrength * 0.4;
    }

    if (rightward) {
      torque.y -= torqueStrength * 0.4;
    }

    body.current?.applyTorqueImpulse(torque, true);
  });

  return (
    <Suspense fallback={null}>
      <Physics gravity={[0, 10, 0]}>
        <RigidBody
          ref={body}
          lockTranslations={true}
          position={[0, 0, 0]}
          restitution={200}
          friction={0.02}
          linearDamping={2}
          angularDamping={8}
        >
          <SkillsGraphModel
            orbColor={orbColor}
            edgeNeighbours={edgeNeighbours}
            orbOpacity={orbOpacity}
            orbRadius={orbRadius}
            updateOrbColor={updateOrbColor}
            updateOrbOpacity={updateOrbOpacity}
            updateOrbRadius={updateOrbRadius}
            vertices={vertices}
          />
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
