import { Canvas } from '@react-three/fiber';
import { HeroScene } from './HeroScene.tsx';
import { SkillsScene } from './SkillsScene.tsx';
import { FX } from './FX.tsx';

export const FiberCanvas = () => {
  const sceneVerticalOffset = 2;

  const sceneOneOffset = -sceneVerticalOffset * 0;
  const sceneTwoOffset = -sceneVerticalOffset * 1;
  const sceneThreeOffset = -sceneVerticalOffset * 2;

  return (
    <>
      <div className="fixed flex w-full h-lvh z-[-1]">
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 100,
            position: [0, 0, 0.5],
          }}
          legacy={true}
        >
          <FX/>

          <group
            position-y={sceneOneOffset}
          >
            <HeroScene/>
          </group>

          <group
            position-y={sceneTwoOffset}
          >
            <SkillsScene/>
          </group>

          <group
            position-y={sceneThreeOffset}
          >
            <HeroScene/>
          </group>
        </Canvas>
      </div>
    </>
  );
};
