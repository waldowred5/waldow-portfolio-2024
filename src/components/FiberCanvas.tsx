import { Canvas } from '@react-three/fiber';
import { FX } from './helpers/FX.tsx';
import { SceneManager } from './SceneManager.tsx';
import { KeyboardInputManager } from './helpers/KeyboardInputManager.tsx';
import { Perf } from 'r3f-perf';
import useSkillsGraphState from '../store/skillsGraph/useSkillsGraphState.ts';

export const FiberCanvas = () => {
  const {
    statsDebugPanelEnabled,
  } = useSkillsGraphState((state) => {
    return {
      statsDebugPanelEnabled: state.statsDebugPanelEnabled,
    };
  });

  return (
    <>
      <div className="fixed flex w-full h-lvh">
        <KeyboardInputManager>
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
            { statsDebugPanelEnabled && <Perf position={'bottom-right'}/> }
            <SceneManager/>
          </Canvas>
        </KeyboardInputManager>
      </div>
    </>
  );
};
