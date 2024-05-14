import React from 'react';
import { Canvas} from '@react-three/fiber';

interface FiberCanvasProps {
  children: React.ReactNode;
}

export const FiberCanvas = ({ children }: FiberCanvasProps) => {
  return (
    <>
      <div className="flex w-full h-lvh z-[-1]">
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 100,
            position: [2, 0.4, 0.5],
            // rotation: [-Math.PI * 2, Math.PI * 0.3, Math.PI * 1.1],
          }}
          legacy={true}
        >
          { children }
        </Canvas>
      </div>
    </>
  );
};
