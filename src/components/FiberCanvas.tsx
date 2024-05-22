import { Canvas } from '@react-three/fiber';
import { FX } from './helpers/FX.tsx';
import { SceneManager } from './SceneManager.tsx';
import { KeyboardInputManager } from './helpers/KeyboardInputManager.tsx';
import { Perf } from 'r3f-perf';
import { useSettings } from '../store/useSettings.ts';

export const FiberCanvas = () => {
  const {
    bloomEnabled,
    statsDebugPanelEnabled,
  } = useSettings((state) => {
    return {
      bloomEnabled: state.bloomEnabled,
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
            { bloomEnabled && <FX/> }
            { statsDebugPanelEnabled && <Perf position={'bottom-right'}/> }
            <SceneManager/>
          </Canvas>
        </KeyboardInputManager>
      </div>
    </>
  );
};
