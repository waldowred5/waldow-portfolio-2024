import { HeroScene } from './components/HeroScene.tsx';
import { FiberCanvas } from './components/FiberCanvas.tsx';
import { HeroText } from './components/HeroText.tsx';

// FEATURES TODO:
// - Add three.js hero scene
// - Add & configure PrimeReact
// - Add & style navbar
// - Add & style links to navbar
// - Add gradient effect at bottom of hero scene
// - Add three.js skills scene (HackerHero Orb)

// CHORES TODO:
// - Update favicon
// - Update README

const App = () => {
  return (
    <div className="flex">
      <div className="flex-col w-full">
        <FiberCanvas>
          <HeroScene/>
        </FiberCanvas>
        <div className="absolute top-0 left-0 w-full">
          <HeroText/>
        </div>
      </div>
    </div>
  );
};

export default App;
