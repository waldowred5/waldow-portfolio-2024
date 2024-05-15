import { Canvas } from '@react-three/fiber';
import { FX } from './helpers/FX.tsx';
import { SceneManager } from './SceneManager.tsx';
import { KeyboardInputManager } from './helpers/KeyboardInputManager.tsx';

export const FiberCanvas = () => {
  return (
    <>
      <div className="fixed flex w-full h-lvh z-[-1]">
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
            <SceneManager/>
          </Canvas>
        </KeyboardInputManager>
      </div>
    </>
  );
};
