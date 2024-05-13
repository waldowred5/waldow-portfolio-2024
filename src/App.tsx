import { Canvas} from '@react-three/fiber';
import { HeroScene } from './components/scenes/HeroScene.tsx';

// FEATURES TODO:
// - Add & configure three.js
// - Add three.js hero scene
// - Add & configure Tailwind
// - Add & configure PrimeReact
// - Add & style navbar
// - Add & style links to navbar
// - Add three.js skills scene (HackerHero Orb)

// CHORES TODO:
// - Update favicon
// - Update README

const App = () => {
  return (
    <>
      {/* Replace this with Tailwind */}
      {/* <div style={{ */}
      {/*   display: 'flex', */}
      {/*   width: '100vw', */}
      {/*   height: '100vh', */}
      {/*   zIndex: '-1', */}
      {/* }}> */}
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
          <HeroScene />
        </Canvas>
      </div>
    </>
  );
};

export default App;
