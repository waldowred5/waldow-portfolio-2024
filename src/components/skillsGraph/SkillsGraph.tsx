import { Suspense, useEffect, useRef } from 'react';
import { folder, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import useEdgeState from '../../store/edge/useEdgeState.ts';
import useRelationState from '../../store/relation/useRelationState.ts';
import usePlayerState from '../../store/player/usePlayerState';
import useSkillsGraphState from '../../store/skillsGraph/useSkillsGraphState.ts';
import useVertexState from '../../store/vertex/useVertexState.ts';
import { SkillsGraphModel } from './SkillsGraphModel.tsx';
import { Vector3 } from 'three';
import useScrollState from '../../store/scroll/useScrollState.ts';

export const SkillsGraph = () => {
  const body = useRef<RapierRigidBody | null>(null);
  const [, getKeys] = useKeyboardControls();

  const {
    maxEdgeLengthPercentage,
    updateMaxEdgeLengthPercentage,
  } = useEdgeState((state) => {
    return {
      maxEdgeLengthPercentage: state.maxEdgeLengthPercentage,
      updateMaxEdgeLengthPercentage: state.updateMaxEdgeLengthPercentage,
    };
  });

  const {
    orbColor,
    orbOpacity,
    orbRadius,
    // radius,
    createNetwork,
    statsDebugPanelEnabled,
    updateStatsDebugPanelEnabled,
    updateOrbColor,
    updateOrbOpacity,
    updateOrbRadius,
  } = useSkillsGraphState((state) => {
    return {
      orbColor: state.orbColor,
      orbOpacity: state.orbOpacity,
      orbRadius: state.orbRadius,
      // radius: state.radius,
      statsDebugPanelEnabled: state.statsDebugPanelEnabled,
      updateStatsDebugPanelEnabled: state.updateStatsDebugPanelEnabled,
      createNetwork: state.createNetwork,
      updateOrbColor: state.updateOrbColor,
      updateOrbOpacity: state.updateOrbOpacity,
      updateOrbRadius: state.updateOrbRadius,
    };
  });

  const {
    playerColors,
  } = usePlayerState((state) => {
    return {
      playerColors: state.playerColors,
      updateSelectedPlayer: state.updateSelectedPlayer,
    };
  });

  const {
    adjacencyMap,
    edgeNeighbours,
    contestProgress,
    updateContestProgress,
  } = useRelationState((state) => {
    return {
      adjacencyMap: state.adjacencyMap,
      edgeNeighbours: state.edgeNeighbours,
      contestProgress: state.contestProgress,
      updateContestProgress: state.updateContestProgress,
    };
  });

  const {
    vertexNumber,
    vertexPlacementChaosFactor,
    vertices,
    resetSelectedVertexPosition,
    selectedVertexPosition,
    selectedVertex,
    updateVertexPlacementChaosFactor,
    updateVertexNumber,
  } = useVertexState((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
      vertices: state.vertices,
      selectedVertexPosition: state.selectedVertexPosition,
      selectedVertex: state.selectedVertex,
      resetSelectedVertexPosition: state.resetSelectedVertexPosition,
      updateVertexPlacementChaosFactor: state.updateVertexPlacementChaosFactor,
      updateVertexNumber: state.updateVertexNumber,
    };
  });

  const {
    scrollPercentage,
  } = useScrollState((state) => {
    return {
      scrollPercentage: state.scrollPercentage,
    };
  });

  // Init Vertices
  useEffect(() => {
    createNetwork();
  }, [vertexNumber, vertexPlacementChaosFactor, maxEdgeLengthPercentage]);

  useEffect(() => {
    console.log({ adjacencyMap });
    console.log({ edgeNeighbours });
  }, [adjacencyMap, edgeNeighbours]);

  // Debug
  useControls('Skills Graph', {
    statsEnabled: {
      value: statsDebugPanelEnabled,
      onChange: (value: boolean) => {
        updateStatsDebugPanelEnabled(value);
      }
    },
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
    // if (scrollPercentage > 0.98) {
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

      if (selectedVertexPosition) {
        const torqueStrengthModifier = 0.02;
        const distanceStrengthModifier = 2.3;
        const directionStrengthModifier = 2.3;
        const locus = selectedVertexPosition.distanceTo(new Vector3(0, 0, -0.7)) * distanceStrengthModifier;
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
    // }
  });

  // TODO: Set minDistance/maxDistance dynamically based on network radius size
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
            // maxEdgeLengthPercentage={maxEdgeLengthPercentage}
            orbOpacity={orbOpacity}
            orbRadius={orbRadius}
            playerColors={playerColors}
            // radius={radius}
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
