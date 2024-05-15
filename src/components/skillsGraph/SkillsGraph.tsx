import { Suspense, useEffect, useRef } from 'react';
import { folder, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import useEdgeState from '../../store/edge/useEdgeState.ts';
import useRelationState from '../../store/relation/useRelationState.ts';
import usePlayerState from '../../store/player/usePlayerState';
import useSkillsGraphState from '../../store/skillsGraph/useSkillsGraphState.ts';
import useVertexState from '../../store/vertex/useVertexState.ts';
import { PLAYER } from '../../store/player/types';
import { SkillsGraphModel } from './SkillsGraphModel.tsx';

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
    updateOrbColor,
    updateOrbOpacity,
    updateOrbRadius,
  } = useSkillsGraphState((state) => {
    return {
      orbColor: state.orbColor,
      orbOpacity: state.orbOpacity,
      orbRadius: state.orbRadius,
      // radius: state.radius,
      createNetwork: state.createNetwork,
      updateOrbColor: state.updateOrbColor,
      updateOrbOpacity: state.updateOrbOpacity,
      updateOrbRadius: state.updateOrbRadius,
    };
  });

  const {
    playerColors,
    updateSelectedPlayer,
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
    updateVertexPlacementChaosFactor,
    updateVertexNumber,
  } = useVertexState((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
      vertices: state.vertices,
      updateVertexPlacementChaosFactor: state.updateVertexPlacementChaosFactor,
      updateVertexNumber: state.updateVertexNumber,
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
    const { upward, downward, leftward, rightward } = getKeys();

    const torque = { x: 0, y: 0, z: 0 };
    const torqueStrength = 1000 * delta;

    torque.x += torqueStrength * 0.005;
    torque.y += torqueStrength * 0.005;

    if (upward) {
      torque.x += torqueStrength * 0.1;
    }

    if (downward) {
      torque.x -= torqueStrength * 0.1;
    }

    if (leftward) {
      torque.y += torqueStrength * 0.1;
    }

    if (rightward) {
      torque.y -= torqueStrength * 0.1;
    }

    body.current?.applyTorqueImpulse(torque, true);
  });

  // Toggle Player
  // useFrame(() => {
  //   const { digitOne, digitTwo } = getKeys();
  //
  //   if (digitOne) {
  //     updateSelectedPlayer(PLAYER.PLAYER_1);
  //   }
  //
  //   if (digitTwo) {
  //     updateSelectedPlayer(PLAYER.PLAYER_2);
  //   }
  // });

  // TODO: Set minDistance/maxDistance dynamically based on network radius size
  return (
    <Suspense fallback={null}>
      {/* <OrbitControls */}
      {/*   enablePan={false} */}
      {/*   enableRotate={false} */}
      {/*   enableZoom={true} */}
      {/*   minDistance={4} */}
      {/*   maxDistance={6} */}
      {/* /> */}
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
